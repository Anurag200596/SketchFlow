import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { useMutation } from 'convex/react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'


interface ButtonProps{
    orgId : string,
    disabled? : boolean
}
const NewBoardButton = ({
    orgId,disabled
}:ButtonProps) => {
  const router = useRouter()
    const create = useMutation(api.board.create)
    const onclick = ()=>{
        create({
            orgId : orgId,
            title:"Untitled"
        })
        .then((id) => {
          toast.success("Board was Created")
          router.push(`/board/${id}`)
        } )
        .catch((error)=> toast.error("Failed to create Board"))
    }
  return (
    <Button 
    disabled = {disabled}
    onClick={onclick}
    className={cn(
        "col-span-1 h-full rounded-lg bg-blue-600 hover:bg-blue-800 flex flex-col items-center justify-center gap-3 py-4 transition",
        disabled && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
      
    >
       <div>

       </div>
       <Plus className='h-12 w-12 text-white stroke-1'/>
       <p className='text-sm text-white font-light'>New Board

       </p>
    </Button>

  )  
}

export default NewBoardButton
