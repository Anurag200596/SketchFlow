import React from 'react'
import { Plus } from 'lucide-react'
import { CreateOrganization } from '@clerk/nextjs'

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "../../../../components/ui/dialog"
import { Hint } from '@/components/hints'

const Newbutton = () => {
  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                <div className='aspect-square mr-4'>
                    <Hint
                    side='right'
                    align='start'
                    sideOffset={18}
                     label="New Organization">
                    <button className=' ml-1 bg-white/25 h-full rounded-md w-full flex justify-center items-center opacity-60 hover:opacity-100 transition'>
                    <Plus className='text-white '></Plus>
                    </button>

                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className= "p-0 border-none bg-transparent max-w-[480px]">
                <CreateOrganization/>
            </DialogContent>
        </Dialog>
      
    </div>
  )
}

export default Newbutton
