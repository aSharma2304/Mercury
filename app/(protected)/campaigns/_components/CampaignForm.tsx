'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
RadioGroup,
RadioGroupItem,
} from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { getAudiences } from "@/app/actions/audienceActions/audience"
import { toast } from "sonner"

const CampaignForm = () => {
    const [audienceOptions,setAudienceOptions]= useState<any>([])
    const [mailOptions,setMailOptions]= useState<any>([])

    const formSchema = z.object({
        name:z.string(),
        send_type: z.enum(["once", "recurrence"]),
    })

    const {register , handleSubmit , watch,formState:{errors}}= useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
    })

    const selectedSendType = watch("send_type")

    const onSubmit = async ()=>{
    }

    const fetchAudiences = async ()=>{
      const {status,audiences,message}= await getAudiences();
      if(status==='failed'){
        toast.error(message);
        return ;
      }
      setAudienceOptions(audiences || []);
    }

   const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <form className="">
        <DialogTrigger asChild>
          <Button variant={ 'outline'}>Create Campaign</Button>
        </DialogTrigger>
        <DialogContent className="md: w-[50%]">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>
              Make use of created mails and audiences to generate campaigns
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={()=>handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" {...register("name")}></Input>
                {errors.name && <span className="text-sm text-destructive">{errors.name.message}</span>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">send_type</Label>
                <RadioGroup defaultValue="once">
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="once" id="r1" />
                        <Label htmlFor="r1">Once</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="recurrence" id="r2" />
                        <Label htmlFor="r2">Reccurence</Label>
                    </div>
                </RadioGroup>
                {errors.send_type && <span className="text-sm text-destructive">{errors.send_type.message}</span>}
            </div>

            <div className="space-y-2">
              {selectedSendType==='recurrence' &&  <span>
                </span>}
            </div>

          </form>

        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CampaignForm