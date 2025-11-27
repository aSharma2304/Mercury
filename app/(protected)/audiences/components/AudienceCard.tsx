import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AudienceType } from "@/types/AudienceType"
import Link from "next/link"



export function AudienceCard({item}:{item:AudienceType}) {
  return (
    <Link href={`/audiences/${item?.id}`}>
    <Card className="w-full max-w-xl ">
      <CardHeader>
        <CardTitle>{item?.name}</CardTitle>
        <CardDescription>
          {item?.description}
        </CardDescription>
        {/* <CardAction>
          <Badge  variant={"secondary"} className="text-lime-800 bg-lime-500/40 rounded-md ">Active</Badge>
        </CardAction> */}
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <div className="w-1/2 bg-green-500/10 text-green-500 rounded-md p-2 text-sm flex flex-col items-center">
            Subs : {item?.subscriber_count}
          </div>
          <div className="w-1/2 bg-yellow-500/10 text-yellow-500 rounded-md p-2 text-sm flex flex-col items-center">
            Created at : {item?.created_at.toLocaleDateString()}
          </div>
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          View Subscribers
        </Button>
      </CardFooter>
    </Card>
    </Link>
  )
}
