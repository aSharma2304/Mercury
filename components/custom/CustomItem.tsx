import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { AddSubscribers } from "@/app/(protected)/audiences/[audienceId]/AddSubscribers"

export function CustomItem() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Subscribers </ItemTitle>
          <ItemDescription>
            Manage and monitor your subscribers
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <AddSubscribers></AddSubscribers>
        </ItemActions>
      </Item>
      
    </div>
  )
}
