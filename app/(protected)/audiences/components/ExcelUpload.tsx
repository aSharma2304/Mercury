'use client'
import z from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addSubscribersExcel } from "@/app/actions/audienceActions/addSubscribers";

const ExcelUpload = ({onClose} :{onClose:()=>void}) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    const excelSchema = z.object({
    name:z.string().optional(),
    email:z.string().optional() , 
    file: z
        .instanceof(FileList)
        .refine((files) => files.length > 0, "File is required")
        .refine(
        (files) => ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]
            .includes(files[0]?.type),
        "Only .xlsx or .xls files are allowed"
        )
        .refine((files) => files[0]?.size <= MAX_FILE_SIZE, "File must be less than 5MB"),
      
    });

    const {register, watch,formState:{errors}, handleSubmit }= useForm<z.infer<typeof excelSchema>>({
        resolver:zodResolver(excelSchema)
    })

    const selectedFile = watch("file");
    console.log(selectedFile)

    const onSubmit = async (values:z.infer<typeof excelSchema>)=>{
        addSubscribersExcel(values);
        onClose();
    }

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
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <input
            type="file"
            {...register("file")}
            accept=".xlsx,.xls"
            className="hidden"
            id="excel-upload"
        />

        <label htmlFor="excel-upload" className="cursor-pointer">
            <div className="space-y-2">

            {!selectedFile?.length ? (
                <>
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">Excel files (.xlsx, .xls)</p>
                </>
            ) : (
                <p className="text-sm font-medium">{selectedFile[0].name}</p>
            )}

            </div>
        </label>
        </div>
        
        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Upload </Button>
        </div>
    </form>
  )
}

export default ExcelUpload