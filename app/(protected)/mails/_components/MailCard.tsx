import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { PencilRuler, Trash2 } from 'lucide-react'

type MailCardProps ={
    title:string,
    description:string,
    tags:string[],
}

const MailCard = ({title,description,tags}:MailCardProps) => {
  return (
    <Item variant="outline">
        <ItemContent>
          <ItemTitle>
            {title}
            {tags.map((tag,ind)=>{return <Badge className='bg-blue-500/25 text-blue-500 rounded-md'  key={ind}>{tag}</Badge>})}
          </ItemTitle>
          <ItemDescription>
              {description}
          </ItemDescription>
              <div>Created at 20 November 2025</div>
              <div>Linked to New Users</div>
          
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            <PencilRuler/>
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2/>
          </Button>
        </ItemActions>
      </Item>
  )
}

export default MailCard