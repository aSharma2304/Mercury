'use client'
import { addAudience } from "@/app/actions/audienceActions/audience"
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
import z from "zod"


export function AddSubscribers() {
  const [open, setOpen] = useState(false)
  const formSchema = z.object({
    title:z.string(),
    description:z.string(),
  })

  const {register , handleSubmit , reset,formState:{errors}} = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
  })

  const onSubmit = async (values:z.infer<typeof formSchema>)=>{
    const {status,message}=await addAudience(values);
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild>
          <Button variant={ 'outline'}>Create Audience</Button>
        </DialogTrigger>
        <DialogContent className="w-1/3">
          <DialogHeader>
            <DialogTitle> New Audience</DialogTitle>
            <DialogDescription>
              Create new audience that suits your purpose
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
            <div className="space-y-2 ">
            <Label htmlFor="email">Title</Label>
            <Input type="text" {...register("title")} className="w-full "></Input>
            {errors.title && <span className="text-sm text-destructive">{errors.title.message}</span>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="json">Description</Label>

            <Textarea
              {...register("description")}
              className="min-h-20 resize-y font-mono text-sm wrap-break-words whitespace-pre-wrap w-full"
            />

            {errors.description && (
                <span className="text-sm text-destructive">{errors.description.message}</span>
            )}
            </div>
        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={()=>{setOpen(false)}}>Cancel</Button>
            <Button type="submit">Save</Button>
        </div>

          </form>
         
        </DialogContent>
    </Dialog>
  )
}
