"use client"
import { deleteSubscriber } from "@/app/actions/subscriberActions/subscriber";
import { DeleteModal } from "@/components/custom/DeleteModal";
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"

export type Subscriber = {
  id: string;
  name: string | null;
  email: string;
  created_at: Date;
  audience_id: string;
  isUnsubscribed: boolean;
};

const handleDelete = async(id:string)=>{
  return await deleteSubscriber(id);
}

export const columns: ColumnDef<Subscriber>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      const email = row.getValue("email") as string

      return (
        <div className="flex flex-col">
          <span>{name}</span>
          <span className="text-sm text-muted-foreground">{email}</span>
        </div>
      )
    },
  },

  {
    accessorKey: "created_at",
    header: "created_ at",
    cell: ({ row }) => {
        const value = row.getValue("created_at");
        const date = new Date(value as string);

        return <span>{date.toLocaleDateString("en-US")}</span>;
    },
    
  },

  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      return <DeleteModal
                onDelete={()=>handleDelete(row.getValue("id"))}
                title="Delete Subscriber"
                description="Are you sure you want to delete this subscriber ? This action is irreversible"
                triggerButton={
                <Button
                  onClick={(e) => {  }}
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 border-destructive/30 hover:bg-destructive/10 hover:border-destructive/60"
                >
                  <Trash2 size={16} className="text-destructive" />
                </Button>
              }
              />
    },
  },
]
