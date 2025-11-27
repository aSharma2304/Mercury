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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SubscriberForm from "../components/SubscriberForm"
import ExcelUpload from "../components/ExcelUpload"
import { useState } from "react"
import ApiForm from "../components/ApiForm"
import JsonForm from "../components/JsonForm"

export function AddSubscribers({audienceId}:{audienceId:string}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <form className="w-[60%]">
        <DialogTrigger asChild>
          <Button variant={ 'outline'}>Add Subscribers</Button>
        </DialogTrigger>
        <DialogContent className="md: w-[60%]">
          <DialogHeader>
            <DialogTitle>Add Subscribers</DialogTitle>
            <DialogDescription>
              Choose how you'd like to add subscribers to your audience
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="form" className="w-full">
            <TabsList>
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="excel">Excel</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
            </TabsList>
            
            <TabsContent value="form" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Add recipients manually using the form below</p>
                <SubscriberForm audienceId={audienceId} onClose={() => setOpen(false)}/>
              </div>
            </TabsContent>
            
            <TabsContent value="excel" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Upload an Excel file containing recipient data</p>
                <ExcelUpload onClose={() => setOpen(false)} />
              </div>
            </TabsContent>
            
            <TabsContent value="api" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Use API endpoint to add recipients programmatically</p>
                <ApiForm  onClose={() => setOpen(false)}/>
              </div>
            </TabsContent>
            
            <TabsContent value="json" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Paste JSON data directly</p>
                <JsonForm  onClose={() => setOpen(false)} />
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </form>
    </Dialog>
  )
}
