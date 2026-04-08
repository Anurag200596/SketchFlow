"use client"


import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const EmptyBoards = () => {
  const router = useRouter()
  const { organization } = useOrganization()
  const Create = useMutation(api.board.create)

  const onclick = () =>{
    if(!organization) return;
    Create({
      orgId: organization.id,
      title: "Untitled"
    })
    .then((id)=>{
      toast.success("Board Created")
      router.push(`/board/${id}`)
    })
    .catch((error)=>{
      toast.error("Failed to create board")
    })
  }
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image
      src="/note.svg"
      alt='Empty'
      height={200}
      width={200}
      />
      <h2 className='text-2xl font-semibold mt-6'>No Boards at All</h2>
      <p className='text-muted-foreground text-sm mt-2'>Satrt by creating your first Board for your Organization</p>
      <div className='mt-6'>
        <Button onClick={onclick}>
            Create Board
        </Button>
      </div>
    </div>
  )
}

export default EmptyBoards
