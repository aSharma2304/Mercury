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
import Link from "next/link"

export function AudienceCard() {
  return (
    <Link href={"/audiences/123"}>
    <Card className="w-full max-w-lg ">
      <CardHeader>
        <CardTitle>Audience name</CardTitle>
        <CardDescription>
          Audience description will come here to signify the logical meaning of the subscriber group
        </CardDescription>
        <CardAction>
          <Badge  variant={"secondary"} className="text-lime-800 bg-lime-500/40 rounded-md ">Active</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div>here analytics will come basic ones liek sub count , created on etc.</div>
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
