"use client"

import React from 'react'
import { useOrganizationList } from '@clerk/nextjs'
import { Item } from './Item'

const List = () => {
    const {userMemberships} = useOrganizationList({
        userMemberships:{
            infinite: true
        }
    })

    if(!userMemberships.data?.length) return null
  return (
    <div>
        <ul className='space-y-4'>
            {
                userMemberships.data?.map((mem)=>(
                  <Item key={mem.organization.id} id={mem.organization.id} name={mem.organization.name}  imageurl={mem.organization.imageUrl}/>
                
                ) )
            }

        </ul>
      
    </div>
  )
}

export default List
