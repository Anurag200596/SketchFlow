"use client"


import { Actions } from '@/components/Actions'
import { Hint } from '@/components/hints'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useRenameModel } from '@/Store/rename-model'
import { useQuery } from 'convex/react'
import { Menu } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const font = Poppins({
  subsets: ["latin"],
  weight : ["600"]
})

const TabSeparator = ()=>{
  return(
    <div className='text-neutral-300 px-1.5'>
      |
    </div>
  )

}


interface InfoProps{
  boardId: string
}

const Info = ({boardId}: InfoProps ) => {
  const {onOpen} = useRenameModel()


  const data  = useQuery(api.board.get,{
    id: boardId as Id<"boards">
  })

  if(!data) return <InfoSkeleton/>
  
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
        <Hint
        label='Go to Boards'
        side='bottom'
        sideOffset={10}
        >
     <Button asChild
     variant="board"
      className='px-2 '>
        <Link
        href="/"
        >
      <Image
      src="/logo.svg"
      alt='logo'
      height={40}
      width={40}
      />
      <span className={cn(
        'ml-2 text-black font-semibold text-xl',font.className
      )}>Board</span>
        </Link>
     </Button>

        </Hint>
        <TabSeparator/>

        <Hint
        label='Edit Title'
        side='bottom'
        sideOffset={10}
        >
        <Button onClick={() => onOpen(data._id,data.title)} variant="board" className='text-base font-normal px-2'>
          {data.title}
        </Button>

        </Hint>
        <TabSeparator/>

        <Actions
        id= {data._id}
        title={data.title}
        side='bottom'
        sideOffset={10}
        >
          <Hint
          label='Main Menu'
          side='bottom'
          sideOffset={10}
          >
            <Button size="icon" variant="board">
          <Menu />
            </Button>

          </Hint>

        </Actions>

    </div>
  )
}

export const InfoSkeleton = () =>{
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px] '>

      </div>
    
  )
}



export default Info
