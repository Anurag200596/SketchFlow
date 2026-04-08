"use client"

import { color, LayerType } from '@/Types/Canvas'
import { useStorage } from '@liveblocks/react'
import React from 'react'
import { memo } from 'react'
import { Rectangle } from './Rectangle'
import Ellipse from './Ellipse'
import { Textlayer } from './Text'
import { Notelayer } from './Note'
import { colorToCss } from '@/lib/utils'
import { Path } from './Path'



interface  layerProps {
    id : string,
    onLayerPointerDown : (e : React.PointerEvent , layerId : string) => void
    selectionColor : string
}
const LayerPreview = memo(({
    id,
    selectionColor,
    onLayerPointerDown  
}:layerProps) => {

  const layer = useStorage((root) => root.layers.get(id))
  if(!layer ) return null
 switch (layer.type) {
  case LayerType.Path:
    return(
      <Path
      key = {id}
      onPointerDown = {(e) => onLayerPointerDown(e,id)}
      x = {layer.x}
      y = {layer.y}
      fill = {layer.fill ? colorToCss(layer.fill) : "#000"}
      points = {layer.points}
      stroke = {selectionColor}
      />
    ) 

  case LayerType.Note:
    return(
      <Notelayer
      id= { id}
      onPointerDown={onLayerPointerDown}
      selectionColor={selectionColor}
      layer={layer}
      />
    )

  case LayerType.Text:
    return(
      <Textlayer
      id= { id}
      onPointerDown={ onLayerPointerDown}
      selectionColor={selectionColor}
      layer={layer}
      />
    )
  case LayerType.Ellipse:
    return(
      <Ellipse
      id={id}
      onPointerDown = {onLayerPointerDown}
      layer = {layer}
      selectionColor = {selectionColor}
      />
    )

  case LayerType.Rectangle:
    return(

        <Rectangle
        id={id}
        onPointerDown = {onLayerPointerDown}
        layer = {layer}
        selectionColor = {selectionColor}
        />



    )
  default:
   console.warn("Unknown Layer Type")
   return null
 }
}
)

LayerPreview.displayName = "LayerPreview"
export default LayerPreview
