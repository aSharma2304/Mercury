'use client'
import { useEffect, useRef } from 'react';
import BeefreeSDK from '@beefree.io/sdk';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod';
import z from "zod"
import { useForm } from 'react-hook-form';

export default function BeefreeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);

 const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters long.")
    .max(100, "Title must not exceed 100 characters.")
    .nonempty("Title is required."),

  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters long.")
    .max(200, "Description must not exceed 200 characters.")
    .nonempty("Description is required."),

  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters long.")
    .max(150, "Subject must not exceed 150 characters.")
    .nonempty("Subject is required."),

  body: z
    .string()
    .trim()
    .min(10, "Email body must be at least 10 characters long.")
    .max(5000, "Email body cannot exceed 5000 characters.")
    .nonempty("Email body is required."),

  replyTo: z
    .string()
    .trim()
    .email("Please enter a valid reply-to email address.")
    .nonempty("Reply-to email is required."),
});


  const {register , formState:{errors }, handleSubmit }= useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema)
  })

  useEffect(() => {
    async function initializeEditor() {
      const beeConfig = {
        container: 'beefree-react-demo',
        language: 'en-US',
        onSave: (pageJson: string, pageHtml: string, ampHtml: string | null, templateVersion: number, language: string | null) => {
          // console.log('Saved!', { pageJson, pageHtml, ampHtml, templateVersion, language });
          console.log('Saved!', { pageJson });
        },
        onError: (error: unknown) => {
          console.error('Error:', error);
        }
      };

      const response = await fetch('http://localhost:4000/api/beefree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: 'demo-user' })
      })
    
      const token = await response.json();
      console.log("token",token);

      const bee = new BeefreeSDK(token.token);
      console.log("bee",bee)
      bee.start(beeConfig, {});
    }

    initializeEditor();
  }, []);

  const onSubmit = (values:z.infer<typeof formSchema>)=>{
    console.log("got values", values)
  }

  return (
    <div className='w-full flex p-4 rounded-md gap-4 '>
      <div
        id="beefree-react-demo"
        ref={containerRef}
        className='h-full w-[70%]  '
      />
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 h-fit">
      <Card >
      <CardHeader>
        <CardTitle>Mail Information</CardTitle>
        <CardDescription>
          Provide the basic email details below. These fields will help us compose your outgoing message.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} placeholder="Newsletter Launch" />
          {errors.title && <span className='text-sm text-destructive'>{errors.title.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" {...register("description")} placeholder="Short internal description" />
          {errors.description && <span className='text-sm text-destructive'>{errors.description.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" {...register("subject")} placeholder="Exciting updates coming your way!" />
          {errors.subject && <span className='text-sm text-destructive'>{errors.subject.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">Body</Label>
          <Textarea
          {...register("body")}
            id="body"
            className="h-40"
            placeholder="Write your email content here..."
          />
          {errors.body && <span className='text-sm text-destructive'>{errors.body.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="replyTo">Reply-To Email</Label>
          <Input id="replyTo" {...register("replyTo")} type="email" placeholder="reply@example.com" />
          {errors.replyTo && <span className='text-sm text-destructive'>{errors.replyTo.message}</span>}
        </div>

        <Button className="w-full" type='submit'>Save Mail Information</Button>
      </CardContent>
      </Card>
      </form>
    </div>
  );
}