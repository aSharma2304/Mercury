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

export function AddSubscribers() {
  return (
    <Dialog >
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
                <div className="border rounded-lg p-4">
                  <p>Form comes here</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="excel" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Upload an Excel file containing recipient data</p>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <input type="file" accept=".xlsx,.xls" className="hidden" id="excel-upload" />
                  <label htmlFor="excel-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">Excel files (.xlsx, .xls)</p>
                    </div>
                  </label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="api" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Use API endpoint to add recipients programmatically</p>
                <div className="border rounded-lg p-4 bg-muted/50">
                  <code className="text-sm">
                    POST /api/recipients
                    <br />
                    Content-Type: application/json
                  </code>
                </div>
                <p className="text-xs text-muted-foreground">API documentation and integration guide</p>
              </div>
            </TabsContent>
            
            <TabsContent value="json" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Paste JSON data directly</p>
                <textarea 
                  className="w-full min-h-[200px] p-4 border rounded-lg font-mono text-sm"
                  placeholder='{"recipients": [{"email": "user@example.com", "name": "John Doe"}]}'
                />
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
