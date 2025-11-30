'use client'
import z from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addSubscribersJson} from "@/app/actions/audienceActions/addSubscribers";
import { Textarea } from "@/components/ui/textarea";

const JsonForm = ({onClose,audienceId} :{onClose:()=>void,audienceId:string}) => {
   const schema = z.object({
        name:z.string().optional(),
        email:z.string().optional(),
        json: z.string(),
        });

    const {register, formState:{errors}, handleSubmit }= useForm<z.infer<typeof schema>>({
        resolver:zodResolver(schema)
    })

    const onSubmit = async (values: z.infer<typeof schema>) => {
        const { json, name, email } = values;

        if (!name?.trim() || !email?.trim()) {
            console.log("enter valid names for name and email field in your json");
            return;
        }

        await addSubscribersJson(json, name, email, audienceId);
        onClose();
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
       <div className="space-y-2">
            <Label htmlFor="name">Name Column </Label>
            <Input type="text" {...register("name")}></Input>
            {errors.name && <span className="text-sm text-destructive">{errors.name.message}</span>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="email">Email Column</Label>
            <Input type="text" {...register("email")}></Input>
            {errors.email && <span className="text-sm text-destructive">{errors.email.message}</span>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="json">JSON</Label>

            <Textarea
                {...register("json")}
                className="h-[225px] overflow-auto font-mono text-sm whitespace-pre"
                placeholder={`[
    {
        "name": "john doe",
        "email": "john@example.com"
    },
    {
        "name": "Sarah parks",
        "email": "sparks@example.com"
    }
]`}
            />

            {errors.json && (
                <span className="text-sm text-destructive">{errors.json.message}</span>
            )}
            </div>
        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
        </div>
    </form>
  )
}

export default JsonForm