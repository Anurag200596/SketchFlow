import React from 'react'
import Emptysearch from './Empty-search'
import EmptyFavourites from './EmptyFavourites'
import EmptyBoards from './EmptyBoards'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Boardcard from './BoardCard'
import NewBoardButton from './NewBoardButton'


interface Boardprops{
    orgId: string,
    query : {
        search? : string,
        favourites? : string
    }
}
const BoardList = ({orgId,query}:Boardprops) => {

    const data = useQuery(api.boards.get,{orgId,...query})
    if(data === undefined){
        return (
            <div>
            <h2 className='mb-8 text-3xl'>
             {
                 query.favourites ? "Favourite Boards" : "Team Boards" 
             }
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8p pb-10'>
                <NewBoardButton orgId={orgId} disabled/>
                <Boardcard.Skeleton/>
                <Boardcard.Skeleton/>
                <Boardcard.Skeleton/>
                <Boardcard.Skeleton/>
                <Boardcard.Skeleton/>
                <Boardcard.Skeleton/>
                 </div>
            </div>
        )
    }
    if(!data?.length && query.search){
        return(
            <div className='mt-30'>
              <Emptysearch/>
            </div>
        )
    }
    if(!data?.length && query.favourites){
        return (
            <div className='mt-30'>
            <EmptyFavourites/>
          </div>
        )
    }
    if(!data.length){
        return (
            <div className='mt-30'>
            <EmptyBoards/>
            </div>
        )
    }
  return (
    <div>
       <h2 className='text-3xl mb-8'>
        {
            query.favourites ? "Favourite Boards" : "Team Boards" 
        }
       </h2>
       <div className='grid grid-cols-1 h-full sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8p pb-10'>
        <NewBoardButton orgId = {orgId}/>
        {
            data?.map((board) => (
                <Boardcard
                  key={board._id}
                  id={board._id}
                  title = {board.title}
                  authorId  = {board.authorId}
                  authorName  = {board.authorName}
                  imageUrl  = {board.imageUrl}
                  createdAt  = {board._creationTime}
                  isFavourite  = {board.isfavourite}
                  orgId = {board.orgId}
                />
              ))
          }
        

       </div>

      
    </div>
  )
}

export default BoardList
