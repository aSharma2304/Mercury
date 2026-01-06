'use client'

import { deleteAudience } from "@/app/actions/audienceActions/audience"
import { DeleteModal } from "@/components/custom/DeleteModal"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AudienceType } from "@/types/AudienceType"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type AudienceCardProps = {
  item: AudienceType
  setAudiences: (input: AudienceType | AudienceType[]) => void
}

export function AudienceCard({ item, setAudiences }: AudienceCardProps) {
  const router = useRouter()

  const handleDeleteAudience = async () => {
    const res = await deleteAudience(item.id)

    if (res?.status === "success") {
      toast.success(res.message)

      // ❗ communicate intent, not logic
      setAudiences(
        [] // special signal handled in parent
      )
    } else {
      toast.error(res?.message)
    }

    return res
  }

  return (
    <Card
      className="
        min-w-sm max-w-md transition-all duration-300 
        hover:shadow-lg hover:scale-[1.01]
        border border-gray-200 dark:border-zinc-800 h-full
        flex flex-col justify-between
      "
    >
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold">
          {item.name}
        </CardTitle>

        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </CardDescription>
      </CardHeader>

      <section className="space-y-4">
        <CardContent>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div className="rounded-lg px-3 py-2 border border-green-500/30 text-green-600 text-sm flex flex-col items-center">
              <span className="font-semibold">{item.subscriber_count}</span>
              <span className="text-xs opacity-70">Subscribers</span>
            </div>

            <div className="rounded-lg px-3 py-2 border border-yellow-500/30 text-yellow-600 text-sm flex flex-col items-center">
              <span className="font-semibold">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
              <span className="text-xs opacity-70">Created</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button
            className="flex-1 h-8"
            onClick={() => router.push(`/audiences/${item.id}`)}
          >
            Inspect
          </Button>

          <DeleteModal
            onDelete={handleDeleteAudience}
            title="Delete Audience"
            description="Are you sure you want to delete this audience? This action is irreversible"
            triggerButton={
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 border-destructive/30 hover:bg-destructive/10"
              >
                <Trash2 size={16} className="text-destructive" />
              </Button>
            }
          />
        </CardFooter>
      </section>
    </Card>
  )
}
