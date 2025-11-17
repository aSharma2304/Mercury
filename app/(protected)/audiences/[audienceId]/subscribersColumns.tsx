"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Trash } from "lucide-react"

export type Subscriber = {
  id: string
  name: string
  email: string
  added_on: Date
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
    accessorKey: "added_on",
    header: "Added On",
    cell: ({ row }) => {
        const value = row.getValue("added_on");
        const date = new Date(value as string);

        return <span>{date.toLocaleDateString("en-US")}</span>;
    },
    
  },

  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      return <Button size={"sm"} variant={"outline"}><Trash color="red" size={20} /></Button>
    },
  },
]
