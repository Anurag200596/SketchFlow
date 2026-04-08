"use client"
import { colorToCss } from '@/lib/utils'
import { Layer } from '@/Types/Canvas'
import React from 'react'

interface EllipseProps {
    id : string,
    onPointerDown : (e:React.PointerEvent,id:string) => void
    layer: Layer
    selectionColor? :string 
}

const Ellipse = ({
    id,
    onPointerDown,
    selectionColor,
    layer
}:EllipseProps) => {
  return (
    <ellipse
    className='drop-shadow-md'
    onPointerDown={(e) =>onPointerDown(e,id)}
    style={{
        transform: `translate(${layer.x}px,${layer.y}px)`
    }}
    cx={layer.width/2}
    cy={layer.height/2}
    rx={layer.width/2}
    ry= {layer.height/2}
    fill={layer.fill ? colorToCss(layer.fill) : "#000" }
    stroke={selectionColor || "transparent"}
    strokeWidth={1}
    />
   
  )
}

export default Ellipse
