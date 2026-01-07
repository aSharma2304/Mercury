'use client'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { AddSubscribers } from "@/app/(protected)/audiences/[audienceId]/AddSubscribers"
import { DeleteModal } from "./DeleteModal"
import { deleteAudience } from "@/app/actions/audienceActions/audience"

export function CustomItem({audienceId,updateSubsList}:{audienceId:string | undefined,updateSubsList:(x:any[])=>void}) {

  const handleDelete = async () => {
    return await deleteAudience(audienceId || "")
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Subscribers </ItemTitle>
          <ItemDescription>
            Manage and monitor your subscribers
          </ItemDescription>
        </ItemContent>
        <ItemActions className="flex gap-3">
          <AddSubscribers updateSubsList={updateSubsList} audienceId={audienceId || ""}></AddSubscribers>
          <DeleteModal 
            onDelete={handleDelete}
            title="Delete Audience"
            description="This will permanently delete the audience and all associated subscribers. This action cannot be undone."
          />
        </ItemActions>
      </Item>
      
    </div>
  )
}
