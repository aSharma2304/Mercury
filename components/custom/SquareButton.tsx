'use client'
import { SquareButtonType } from '@/types/SquareButtonType'
import {Tooltip,TooltipContent,TooltipTrigger,} from "@/components/ui/tooltip"
import { Button } from '../ui/button'

const SquareButton = (prop:SquareButtonType) => {
  return (
    <Tooltip>
        <TooltipTrigger asChild>
             <Button className ="size-10" variant={'outline'}>
                    {prop.icon}
            </Button>
        </TooltipTrigger>
        <TooltipContent className='bg-background text-foreground'>
            <p>{[prop.label]}</p>
        </TooltipContent>
    </Tooltip>
  )
}

export default SquareButton