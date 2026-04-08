"use client"

import React from 'react'
import Emptyorg from './_Components/Empty-org'
import { useOrganization } from '@clerk/nextjs'
import { useSearchParams } from "next/navigation";
import BoardList from './_Components/BoardList';

const page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const favourites = searchParams.get("favourites");
 
  const {organization} = useOrganization()
  return (
    <div className='flex-1 h-[calc(100%-80px)] p-6'>
      <div>
</div>

      {
        !organization ? <Emptyorg/> : <BoardList orgId= {organization.id} query ={{ search : search || "",favourites : favourites || ""}}/>
      }
     
    </div>
  )
}

export default page
