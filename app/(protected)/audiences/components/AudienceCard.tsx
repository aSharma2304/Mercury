import { Badge } from "@/components/ui/badge"
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
import Link from "next/link"

export function AudienceCard({ item }: { item: AudienceType }) {
  return (
    <Link href={`/audiences/${item?.id}`} className="block group">
      <Card className="
        min-w-sm max-w-md transition-all duration-300 
        hover:shadow-lg hover:scale-[1.01] cursor-pointer
        border border-gray-200 dark:border-zinc-800 h-full
        flex flex-col justify-between
        ">
        
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition">
            {item?.name}
          </CardTitle>

          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {item?.description}
          </CardDescription>
        </CardHeader>

        <section className="space-y-4">
        <CardContent>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div className="
              rounded-lg px-3 py-2 border border-green-500/30 
              text-green-600 dark:text-green-400 text-sm flex flex-col items-center
              ">
              <span className="font-semibold">{item?.subscriber_count}</span>
              <span className="text-xs opacity-70">Subscribers</span>
            </div>

            <div className="
              rounded-lg px-3 py-2 border border-yellow-500/30 
              text-yellow-600 dark:text-yellow-400 text-sm flex flex-col items-center
              ">
              <span className="font-semibold">
                {item?.created_at.toLocaleDateString()}
              </span>
              <span className="text-xs opacity-70">Created</span>
            </div>

          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full font-medium">
            View Subscribers
          </Button>
        </CardFooter>
        </section>


      </Card>
    </Link>
  )
}
