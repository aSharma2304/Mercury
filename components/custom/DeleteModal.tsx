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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useState } from "react"
import { Spinner } from "../ui/spinner"

interface DeleteModalProps {
  triggerButton?: React.ReactNode
  title?: string
  description?: string
  confirmText?: string
  onDelete: () => Promise<{ status: string; message: string }>
  requireConfirmation?: boolean
}

export function DeleteModal({
  triggerButton,
  title = "Confirm Delete",
  description = "Once deleted the changes will not be reversible",
  confirmText = "delete",
  onDelete,
  requireConfirmation = true,
}: DeleteModalProps) {
  const [deleteInput, setDeleteInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (requireConfirmation && deleteInput.toLowerCase() !== confirmText.toLowerCase()) {
      toast.error(`Please type '${confirmText}' to confirm`)
      return
    }

    setIsDeleting(true)
    try {
      const { status, message } = await onDelete()
      
      if (status === "success") {
        toast.success(message)
        setIsOpen(false)
        setDeleteInput("")
      } else {
        toast.error(message)
      }
    } catch (error) {
      toast.error("An error occurred while deleting")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="destructive">Delete</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleDelete}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          
          {requireConfirmation && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="deleteInput" className="text-sm">
                  Type '{confirmText}' to confirm the deletion
                </Label>
                <Input 
                  id="deleteInput" 
                  value={deleteInput}
                  onChange={(e) => setDeleteInput(e.target.value)}
                  placeholder={confirmText}
                  autoComplete="off"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isDeleting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive" disabled={isDeleting}>
              {isDeleting ? <Spinner/> : "Delete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}