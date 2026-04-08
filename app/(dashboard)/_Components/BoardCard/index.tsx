"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Overlay from './Overlay'
import { useAuth } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'
import Footer from './Footer'
import { Skeleton } from '@/components/ui/skeleton'
import { Actions } from '@/components/Actions'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

interface BoardProps{
    id:Id<"boards">,
    title: string,
    imageUrl : string,
    createdAt : number,
    authorId : string,
    authorName : string,
    orgId : string,
    isFavourite : boolean
}

const Boardcard = ({
    id,title,imageUrl,createdAt,authorId,authorName,orgId,isFavourite
}: BoardProps) => {
    
        const toggleFavourite = () =>{
            if(isFavourite){
                unfavourite({id,orgId})
                .catch((error)=> toast.error("Error while Unfavouriting the Board"))
            }
            else {
                favourite({id,orgId})
                .catch((error) => toast.error("Error while Favouriting the Board"))
    
            }
        }

    const handleClick = ( event : React.MouseEvent<HTMLElement,MouseEvent>) =>{
        event.stopPropagation();
        event.preventDefault();
        toggleFavourite()

    }

    const favourite = useMutation(api.board.favourite)
    const unfavourite = useMutation(api.board.unFavourite)

    const {userId} = useAuth()
    const authLabel = userId === authorId ? "You" : "authorName" 
    const createdAtLabel = formatDistanceToNow(createdAt,{
        addSuffix:true
    })
  return (
    <Link
    href={`/board/${id}`}
    >
    <div className=' group aspect-100/127 border rounded-lg flex flex-col justify-between overflow-hidden '>
    <div className='flex-1 relative bg-amber-50'>
        <Image
        src={imageUrl}
        alt='title'
        fill
        className='object-fit'
        />
        <Overlay/>
        <Actions
        id= {id}
        title= {title}
        side ="right"
        >
            <Button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 px-3 py-3 outline-none'>
                <MoreHorizontal className='text-white opacity-75 hover:opacity-100 transition-opacity'/>
            </Button>
            </Actions>
    </div>

    <Footer
    isFavourite = {isFavourite}
    title = {title}
    authorLabel = {authLabel}
    createdAtLabel = {createdAtLabel}
    onclick={handleClick}
    disabled = {false}
     />
      
    </div>

    </Link>
  )
}

Boardcard.Skeleton = function BoardCardSkeleton(){
    return (
        <div className='aspect-100/127  rounded-lg overflow-hidden '>
            <Skeleton className='h-full w-full'/>
             </div>

    )
}

export default Boardcard
