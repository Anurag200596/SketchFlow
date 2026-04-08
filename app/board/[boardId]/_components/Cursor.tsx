"use client"

import { connectionIdToBorderColor } from "@/lib/utils"
import { useOther } from "@liveblocks/react"
import { MousePointer2, MousePointerIcon } from "lucide-react"
import { memo } from "react"

import React from 'react'


interface CursorProps {
    connectionId: number
}


const Cursor = memo(({ connectionId }: CursorProps) => {
    const info = useOther(connectionId, (user) => user?.info)
    const cursor = useOther(connectionId, (user) => user.presence.cursor)
    const name = info?.name || "Teammate"
    if(!cursor) return null

    const { x , y } = cursor
    return (
        <>
        <foreignObject
        style={
            {
                transform : `translateX(${x}px) tranlateY(${y}px)`
            }
        }
        height={50}
        width={name.length * 10 + 24}
        className="relative drop-shadow-md"
        >
            <MousePointer2
            style={{
                fill: connectionIdToBorderColor(connectionId),
                color: connectionIdToBorderColor(connectionId)
            }}
              className="h-5 w-5">

            </MousePointer2>
        </foreignObject>

        <div
        style={{backgroundColor : connectionIdToBorderColor(connectionId)}}
         className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold">
            {name}
        </div>

        </>
    )

})

Cursor.displayName = "Cursor"

export default Cursor
