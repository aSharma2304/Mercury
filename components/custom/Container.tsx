import React from 'react'

const Container = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-full xl:w-4/5 flex flex-col p-6 gap-6 mt-12 text-foreground'>
        {children}
    </div>
  )
}

export default Container