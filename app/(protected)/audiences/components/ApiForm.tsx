'use client'
import z from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addSubscribersAPI} from "@/app/actions/audienceActions/addSubscribers";

const ApiForm = ({onClose} :{onClose:()=>void}) => {
   const schema = z.object({
        url: z.url()
            .startsWith("https://", "API URL must start with https://"),
        });

    const {register, formState:{errors}, handleSubmit }= useForm<z.infer<typeof schema>>({
        resolver:zodResolver(schema)
    })

    const onSubmit = async (values:{ url: string; })=>{
        addSubscribersAPI(values);
        onClose();
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-2">
            <Label htmlFor="url">API Endpoint</Label>
            <Input type="text" {...register("url")} placeholder={`https://api.example.com/v1/users`}>
            </Input>
            {errors.url && <span className="text-sm text-destructive">{errors.url.message}</span>}
        </div>
        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Fetch</Button>
        </div>
    </form>
  )
}

export default ApiForm