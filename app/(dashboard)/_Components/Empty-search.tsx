import Image from 'next/image'
import React from 'react'

const Emptysearch = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image
      src="/empty-search.svg"
      alt='Empty'
      height={200}
      width={200}
      />
      <h2 className='text-2xl font-semibold mt-6'>No results found</h2>
      <p className='text-muted-foreground text-sm mt-2'>Try Seraching Something Else</p>
    </div>
  )
}

export default Emptysearch
