"use client"


import React from 'react'
import { UserAvatar } from './user-avatar'
import { useOthers, useSelf } from '@liveblocks/react'
import { connectionIdToBorderColor } from '@/lib/utils'

const Participants = () => {
  const otherUsers = useOthers()
  const currentUser = useSelf()
  const MAX_USERS_TO_SHOW = 2;
  const HAS_MORE_USERS = otherUsers.length > MAX_USERS_TO_SHOW

  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
      <div className='flex gap-x-2'>
        {
          otherUsers.slice(0,MAX_USERS_TO_SHOW).map(({connectionId,info}) => {
            return(
              <UserAvatar
              key={connectionId}
              borderColor= { connectionIdToBorderColor(connectionId)}
              name={info?.name}
              src={info?.picture}
              fallback= {info?.name?.[0] || "T"}


              >

              </UserAvatar>
            )
          })
        }
        {
          currentUser && <UserAvatar
          name={currentUser.info?.name}
          borderColor={connectionIdToBorderColor(currentUser.connectionId)}
          src={currentUser.info?.picture}
          fallback={currentUser.info?.name?.[0]}
          >

          </UserAvatar>
        }

        {
          HAS_MORE_USERS && 
          <UserAvatar
          name={`${otherUsers.length - MAX_USERS_TO_SHOW} more`}
          fallback={`+ ${otherUsers.length - MAX_USERS_TO_SHOW}`}
          >

          </UserAvatar>
        }

      </div>
    </div>
  )
}

export const ParticipantsSkeleton =() =>{
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]'>
      </div>
    
  )
}

export default Participants
