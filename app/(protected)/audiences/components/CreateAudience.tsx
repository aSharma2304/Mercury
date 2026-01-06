'use client'

import { addAudience, editAudience } from "@/app/actions/audienceActions/audience"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { AudienceType } from "../page"

type AddAudienceProps = {
  setItem: (input: AudienceType | AudienceType[]) => void
  audienceId?: string
  oldInfo?: {
    title: string
    description: string
  }
}

export function AddAudience({
  setItem,
  audienceId = "",
  oldInfo,
}: AddAudienceProps) {
  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
  })

  const isEdit = audienceId !== ""

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? oldInfo
      : { title: "", description: "" },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isEdit) {
      const { status, message, audience } =
        await editAudience(audienceId, values)

      if (status === "failed") {
        toast.error(message)
        return
      }

      if (audience) {
        setItem(audience)
        toast.success(message)
        setOpen(false)
      }

      return
    }

    const { status, message, audience } =
      await addAudience(values)

    if (status === "failed") {
      toast.error(message)
      return
    }

    if (audience) {
      setItem(audience)
      toast.success(message)
      setOpen(false)
    }

    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {isEdit ? "Edit Audience" : "Create Audience"}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-1/3">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Audience" : "New Audience"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update audience details"
              : "Create a new audience that suits your purpose"}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="space-y-2">
            <Label>Title</Label>
            <Input {...register("title")} />
            {errors.title && (
              <span className="text-sm text-destructive">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              {...register("description")}
              className="min-h-24 resize-y"
            />
            {errors.description && (
              <span className="text-sm text-destructive">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
