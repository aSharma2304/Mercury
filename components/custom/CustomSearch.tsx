'use client'

import { Search } from 'lucide-react'
import { Input } from '../ui/input'

const CustomSearch = ({placeholder}:{placeholder:string}) => {
  return (
    <div className='w-fit max-w-[500px] relative'>
        <Search className='absolute top-2 left-2 ' size={20}/>
        <Input className='pl-9' placeholder={placeholder} name="customSearch" type="text" onChange={()=>{}} />
    </div>
  )
}

export default CustomSearch