'use client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PencilRuler, Trash2, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

// type MailCardProps = {
//   id:string,
//   title: string
//   description: string
//   tags: string[]
//   createdAt: string
//   linkedTo: string
// }
export type MailCardProps = {
  id: string;
  title: string;
  description: string;
  subject: string | null;
  html_content: string | null;
  json_content: string;
  user_id: number;
  body: string | null;
  reply_to: string;
  created_at: Date;
  updated_at: Date;
};

export default function MailCard({ mail  }: {mail:MailCardProps}) {

  const {id,title, description, created_at} = mail;
  const router = useRouter();

  return (
    <div className="
      group relative rounded-xl border border-border/70 bg-card p-5 cursor-pointer
      hover:border-primary/40 hover:shadow-[0_4px_18px_rgba(0,0,0,0.08)]
      transition-all duration-300 min-w-lg max-w-2xl
    ">

      {/* Floating mail icon */}
      <div className="absolute right-4 top-4 rounded-full bg-primary/10 p-2.5">
        <Mail size={20} className="text-primary" />
      </div>

      {/* Main Content */}
      <div className="space-y-4 pr-12">

        <h3 className="text-base font-semibold text-foreground leading-tight">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Tag Pills */}
        <div className="flex flex-wrap gap-2">
          {/* {tags.map((tag, i) => (
            <Badge
              key={i}
              variant="outline"
              className="
                border-primary/30 text-primary/90 bg-primary/5 
                hover:bg-primary/10 transition-colors rounded-md
              "
            >
              {tag}
            </Badge>
          ))} */}
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 ">
          <span>{created_at.toLocaleDateString()}</span>
          <span className="text-primary/40">•</span>
          {/* <span>{linkedTo}</span> */}
        </div>

      </div>

      {/* Hover-Reveal Action Buttons */}
      <div className="
        absolute bottom-4 right-4 flex gap-2 opacity-0 pointer-events-none
        group-hover:opacity-100 group-hover:pointer-events-auto
        transition-all duration-300
      ">

        <Button
          onClick={(e) => { 
            router.push(`/mails/create/${id}`)
          }}
          size="icon"
          variant="outline"
          className="h-8 w-8 border-primary/30 hover:bg-primary/5 hover:border-primary/60"
        >
          <PencilRuler size={16} className="text-primary" />
        </Button>

        <Button
          onClick={(e) => {  }}
          size="icon"
          variant="outline"
          className="h-8 w-8 border-destructive/30 hover:bg-destructive/10 hover:border-destructive/60"
        >
          <Trash2 size={16} className="text-destructive" />
        </Button>

      </div>
    </div>
  )
}
