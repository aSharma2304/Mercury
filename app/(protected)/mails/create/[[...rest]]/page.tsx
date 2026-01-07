'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import BeefreeSDK from '@beefree.io/sdk';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import z from "zod";
import { useForm } from 'react-hook-form';
import { getMail, saveMail } from '@/app/actions/mailActions/mails';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';

export default function BeefreeEditor() {
  const params = useParams();
  const mailId = Array.isArray(params.rest) ? params.rest[0] : params.rest;

  const containerRef = useRef<HTMLDivElement>(null);
  const beeRef = useRef<any>(null);

  const [editorReady, setEditorReady] = useState(false);
  const [template, setTemplate] = useState({
    pageHtml: "",
    pageJson: ""
  });

  /* ----------------------------- ZOD SCHEMA ----------------------------- */
  const formSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(5),
    subject: z.string().min(3),
    body: z.string().min(10),
    replyTo: z.string().email()
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      subject: "",
      body: "",
      replyTo: ""
    }
  });

  /* -------------------------- INIT BEEFREE ONCE -------------------------- */
  useEffect(() => {
    async function initBeeFree() {
      try {
        const response = await fetch('http://localhost:4000/api/beefree', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid: 'demo-user' })
        });

        const token = await response.json();

        const beeConfig = {
          container: 'beefree-react-demo',
          language: 'en-US',
          onSave: (pageJson: string, pageHtml: string) => {
            setTemplate({ pageHtml, pageJson });
          },
          onError: console.error
        };

        beeRef.current = new BeefreeSDK(token.token);
        beeRef.current.start(beeConfig, {});

        setEditorReady(true);
      } catch (err) {
        console.error("BeeFree init failed", err);
      }
    }

    initBeeFree();
  }, []);

  /* --------------------------- FETCH MAIL (EDIT) -------------------------- */
  useEffect(() => {
  if (!mailId || !editorReady) return;

  async function fetchMail() {
    const res = await getMail(mailId || "");

    if (res?.status === "failed") {
      toast.error(res.message);
      return;
    }

    const mail = res.mail;

    console.log("mail is", mail);

    // Populate form
    reset({
      title: mail?.title ?? "",
      description: mail?.description ?? "",
      subject: mail?.subject ?? "",
      body: mail?.body ?? "",
      replyTo: mail?.reply_to ?? ""
    });

    // Load BeeFree content
    if (mail?.json_content) {
      beeRef.current.load(JSON.parse(mail?.json_content));
    }

    setTemplate({
      pageHtml: mail?.html_content ?? "",
      pageJson: mail?.json_content ?? ""
    });
  }

  fetchMail();
}, [mailId, editorReady, reset]);


  /* ------------------------------- SUBMIT ------------------------------- */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!template.pageHtml || !template.pageJson) {
      toast.warning("Please save something in the editor first");
      return;
    }

    const res = await saveMail({
      ...values,
      reply_to: values.replyTo,
      pageHtml: template.pageHtml,
      pageJson: template.pageJson,
    });

    if (res?.status === "failed") {
      toast.error(res.message);
      return;
    }

    toast.success(res?.message);
  };

  /* ------------------------------- UI ------------------------------- */
  return (
    <div className="w-full flex gap-4 p-4">
      {/* ------------------- BEEFREE EDITOR WITH LOADER ------------------- */}
      <div className="flex-1 min-h-150">
        {!editorReady && (
          <div className="h-150 w-full rounded-md bg-muted animate-pulse flex items-center justify-center">
            <span className="text-sm text-muted-foreground">
              Loading email editor…
            </span>
          </div>
        )}

        <div
          id="beefree-react-demo"
          ref={containerRef}
          className={editorReady ? "block h-full" : "hidden"}
        />
      </div>

      {/* ----------------------------- FORM ----------------------------- */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-105">
        <Card>
          <CardHeader>
            <CardTitle>Mail Information</CardTitle>
            <CardDescription>
              Provide the basic email details below.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input {...register("title")} />
              {errors.title && <p className="text-destructive">{errors.title.message}</p>}
            </div>

            <div>
              <Label>Description</Label>
              <Input {...register("description")} />
              {errors.description && <p className="text-destructive">{errors.description.message}</p>}
            </div>

            <div>
              <Label>Subject</Label>
              <Input {...register("subject")} />
              {errors.subject && <p className="text-destructive">{errors.subject.message}</p>}
            </div>

            <div>
              <Label>Body</Label>
              <Textarea {...register("body")} className="h-32" />
              {errors.body && <p className="text-destructive">{errors.body.message}</p>}
            </div>

            <div>
              <Label>Reply To</Label>
              <Input {...register("replyTo")} />
              {errors.replyTo && <p className="text-destructive">{errors.replyTo.message}</p>}
            </div>

            <Button className="w-full" type="submit">
              Save Mail
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
