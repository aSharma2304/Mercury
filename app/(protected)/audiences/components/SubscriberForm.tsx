'use client'
import z from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addSubscribersForm } from "@/app/actions/audienceActions/addSubscribers";

const SubscriberForm = ({onClose,audienceId} :{onClose:()=>void,audienceId:string}) => {
    const formSchema = z.object({
        name:z.string("Name is required").min(3,"Name should be atleast 3 characters long"),
        email:z.email("Email is required"),
    })

    const {register, formState:{errors}, handleSubmit }= useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema)
    })

    const onSubmit = async (values:{ name: string; email: string; })=>{
        const updatedValues = {...values,audienceId};
        addSubscribersForm(updatedValues);
        onClose();
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input type="text" {...register("name")}></Input>
            {errors.name && <span className="text-sm text-destructive">{errors.name.message}</span>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" {...register("email")}></Input>
            {errors.email && <span className="text-sm text-destructive">{errors.email.message}</span>}
        </div>
        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save changes</Button>
        </div>
    </form>
  )
}

export default SubscriberForm