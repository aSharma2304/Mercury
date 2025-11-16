import React from 'react'

type HeadingPairProps ={
    heading:string,
    subheading?:string,
}

const HeadingPair = ({heading,subheading}:HeadingPairProps) => {
  return (
    <div className='flex flex-col gap-2'>
        <h2 className='text-3xl font-bold '>
            {heading}
        </h2>
        <h3 className='text-xl'>
            {subheading}
        </h3>
    </div>
  )
}

export default HeadingPair