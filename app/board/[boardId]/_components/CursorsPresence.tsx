"use client"
import { shallow, useOthersConnectionIds, useOthersMapped } from '@liveblocks/react'
import React, { memo } from 'react'
import Cursor from './Cursor'
import { Path } from './Path'
import { colorToCss } from '@/lib/utils'


const Cursors = () =>{
    const ids = useOthersConnectionIds()
    return(
        <>
        {
            
            ids.map((id) => (
                <Cursor 
                key = {id}
                connectionId = {id}
                />
            ))
        }

        </>

    )
}

const drafts = () => {
    const others = useOthersMapped((other) => ({
        pencilDraft : other.presence.pencilDraft,
        pencilColor : other.presence.pencilColor
    }),shallow)

    return(
        <>
        {
            others.map(([key,other]) =>{
                if(other.pencilDraft){
                    return(
                        <Path
                        key={key}
                        x={0}
                        y={0}
                        points={other.pencilDraft}
                        fill={other.pencilColor ? colorToCss(other.pencilColor) : "#000"}
                        />
                    )
                }

            })
        }
        </>
    )
}

const CursorsPresence = memo(() => {
    return(
        <>
        <Cursors/>

        </>
    )

})

CursorsPresence.displayName = "CursorsPresence"

export default CursorsPresence
