import Hero from '@/components/custom/Hero'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-4 items-center mt-24'>
      <div>Mercury.</div>
      <div className="w-[140px] flex ">
      <span className="inline-block size-7 bg-red-500"></span>
      <span className="inline-block size-7 bg-orange-500"></span>
      <span className="inline-block size-7 bg-yellow-500"></span>
      <span className="inline-block size-7 bg-green-500"></span>
      <span className="inline-block size-7 bg-blue-500"></span>
    </div>
    </div>
  )
}

export default page