"use client"



import { useSelectionBounds } from '@/hooks/UseSelectionBounds'
import { LayerType, side, XYWH } from '@/Types/Canvas'
import { useSelf, useStorage } from '@liveblocks/react'
import React from 'react'

import { memo } from 'react'

interface BoxProps {
    onResizeHandlePointerDown: (corner: side, intialBounds: XYWH) => void
}


const HANDLE_WIDTH = 8
const SelectionBox = memo(({
    onResizeHandlePointerDown
}: BoxProps) => {
    const soleLayerID = useSelf((me) => me.presence.selection.push.length === 1 ? me.presence.selection[0] : null)

    const isShowingHandles = useStorage((root) => soleLayerID && root.layers.get(soleLayerID)?.type !== LayerType.Path)

    const bounds = useSelectionBounds()
    if (!bounds) return null;
    return (
        <>
            <rect
                className='fill-transparent stroke-2 stroke-blue-600 pointer-events-none'
                x={0}
                y={0}
                style={{
                    transform: `translate(${bounds.x}px,${bounds.y}px)`
                }}
                height={bounds.height}
                width={bounds.width}
            />

            {
                isShowingHandles && (
                    <>
                        <rect
                            className='fill-white stroke-1 stroke-blue-500'
                            x={0}
                            y={0}
                            style={
                                {
                                    cursor: "nwse-resize",
                                    width: `${HANDLE_WIDTH}px`,
                                    height: `${HANDLE_WIDTH}px`,
                                    transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px,${bounds.y - HANDLE_WIDTH / 2}px)`
                                }
                            }
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResizeHandlePointerDown(side.top+side.left,bounds)

                            }}
                        />

                        <rect
                            className='fill-white stroke-1 stroke-blue-500'
                            x={0}
                            y={0}
                            style={
                                {
                                    cursor: "ns-resize",
                                    width: `${HANDLE_WIDTH}px`,
                                    height: `${HANDLE_WIDTH}px`,
                                    transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,${bounds.y - HANDLE_WIDTH / 2}px)`
                                }
                            }
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResizeHandlePointerDown(side.top,bounds)

                            }}
                        />

                        <rect
                            className='fill-white stroke-1 stroke-blue-500'
                            x={0}
                            y={0}
                            style={
                                {
                                    cursor: "nesw-resize",
                                    width: `${HANDLE_WIDTH}px`,
                                    height: `${HANDLE_WIDTH}px`,
                                    transform: `translate(${bounds.x - HANDLE_WIDTH/2 + bounds.width}px,${bounds.y - HANDLE_WIDTH/2}px)`
                                }
                            }
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResizeHandlePointerDown(side.top + side.right,bounds)

                            }}
                        />
                         <rect
                            className='fill-white stroke-1 stroke-blue-500'
                            x={0}
                            y={0}
                            style={
                                {
                                    cursor: "ew-resize",
                                    width: `${HANDLE_WIDTH}px`,
                                    height: `${HANDLE_WIDTH}px`,
                                    transform: `translate(${bounds.x - HANDLE_WIDTH/2 + bounds.width}px,${bounds.y + bounds.height/2 - HANDLE_WIDTH/2}px)`
                                }
                            }
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResizeHandlePointerDown(side.right,bounds)

                            }}
                        />
                         <rect
                            className='fill-white stroke-1 stroke-blue-500'
                            x={0}
                            y={0}
                            style={
                                {
                                    cursor: "nwse-resize",
                                    width: `${HANDLE_WIDTH}px`,
                                    height: `${HANDLE_WIDTH}px`,
                                    transform: `translate(${bounds.x - HANDLE_WIDTH/2 + bounds.width}px,${bounds.y - HANDLE_WIDTH/2 + bounds.height}px)`
                                }
                            }
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResizeHandlePointerDown(side.bottom + side.right, bounds)

                            }}
                        />
                         <rect
                            className='fill-white stroke-1 stroke-blue-500'
                            x={0}
                            y={0}
                            style={
                                {
                                    cursor: "ns-resize",
                                    width: `${HANDLE_WIDTH}px`,
                                    height: `${HANDLE_WIDTH}px`,
                                    transform: `translate(${bounds.x + bounds.width/2 - HANDLE_WIDTH/2}px,${bounds.y - HANDLE_WIDTH/2 + bounds.height}px)`
                                }
                            }
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResizeHandlePointerDown(side.bottom,bounds)

                            }}
                        />
                         <rect
                            className='fill-white stroke-1 stroke-blue-500'
                            x={0}
                            y={0}
                            style={
                                {
                                    cursor: "nesw-resize",
                                    width: `${HANDLE_WIDTH}px`,
                                    height: `${HANDLE_WIDTH}px`,
                                    transform: `translate(${bounds.x - HANDLE_WIDTH/2}px,${bounds.y - HANDLE_WIDTH/2 + bounds.height}px)`
                                }
                            }
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResizeHandlePointerDown(side.bottom + side.left,bounds)

                            }}
                        />

<rect
                            className='fill-white stroke-1 stroke-blue-500'
                            x={0}
                            y={0}
                            style={
                                {
                                    cursor: "ew-resize",
                                    width: `${HANDLE_WIDTH}px`,
                                    height: `${HANDLE_WIDTH}px`,
                                    transform: `translate(${bounds.x - HANDLE_WIDTH/2}px,${bounds.y - HANDLE_WIDTH/2 + bounds.height/2}px)`
                                }
                            }
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResizeHandlePointerDown(side.left,bounds)

                            }}
                        />
                        

                    </>
                )

            }


        </>
    )

})

SelectionBox.displayName = "SelectionBox"

export default SelectionBox
