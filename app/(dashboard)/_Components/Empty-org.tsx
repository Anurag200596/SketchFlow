import { Button } from '@/components/ui/button'
import { CreateOrganization } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

import {
    Dialog,
    DialogTrigger,
    DialogContent
} from "../../../components/ui/dialog"

const Emptyorg = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
        <Image
        src="/logo.svg"
        alt='Empty'
        height={250}
        width={250}
        />
        <h2 className='text-2xl font-bold mt-6'>Welcome to Board</h2>
        <p className='text-muted-foreground text-sm mt-2'>
            Create an organization to get started
        </p>

        <div className='mt-6'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg">
                        Create organization
                    </Button>
                </DialogTrigger>
                <DialogContent className='p-0 bg-transparent border-none max-w-[480px]'>
                    <CreateOrganization></CreateOrganization>
                </DialogContent>
            </Dialog>
        </div>
      
    </div>
  )
}

export default Emptyorg
