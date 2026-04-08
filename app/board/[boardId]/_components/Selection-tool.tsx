"use client"


import { useSelectionBounds } from '@/hooks/UseSelectionBounds'
import { camera, color } from '@/Types/Canvas'
import { useMutation, useSelf } from '@liveblocks/react'
import React, { memo } from 'react'
import { ColorPicker } from './ColorPicker'
import { Hint } from '@/components/hints'
import { Button } from '@/components/ui/button'
import { useDeleteLayers } from '@/hooks/DeleteLayers'
import { BringToFront, SendToBack, Trash2 } from 'lucide-react'

interface selectionProps{
    camera : camera
    setLastUsedColor : (color:color) => void
}

const Selectiontool = memo(({
    camera,
    setLastUsedColor
}:selectionProps) => {
    const deleteLayers = useDeleteLayers()
    const selection = useSelf((me) => me.presence.selection)

    const handleMoveToBack = useMutation(
        ({ storage }) => {
            if(!selection) return
          const liveLayerIds = storage.get("layerIds");
  
          const indices: number[] = [];
  
          const arr = liveLayerIds.toImmutable();
  
          for (let i = 0; i < arr.length; i++) {
            if (selection.includes(arr[i])) {
              indices.push(i);
            }
          }
  
          for (let i = 0; i < indices.length; i++) {
            liveLayerIds.move(indices[i], i);
          }
        },
        [selection]
      );
  
      const handleMoveToFront = useMutation(
        ({ storage }) => {
            if(!selection) return;
          const liveLayerIds = storage.get("layerIds");
  
          const indices: number[] = [];
  
          const arr = liveLayerIds.toImmutable();
  
          for (let i = 0; i < arr.length; i++) {
            if (selection.includes(arr[i])) {
              indices.push(i);
            }
          }
  
          for (let i = indices.length - 1; i >= 0; i--) {
            liveLayerIds.move(
              indices[i],
              arr.length - 1 - (indices.length - 1 - i)
            );
          }
        },
        [selection]
      );
  

    const setFill = useMutation(({
        storage
    },fill:color) => {
        const livelayers = storage.get("layers")
        setLastUsedColor(fill)


        selection?.forEach((id) =>{
            livelayers.get(id)?.set("fill",fill) 

        })
       

    },[selection,setLastUsedColor])




    const selectionBounds = useSelectionBounds()
    if(!selectionBounds) return
    const x = selectionBounds.width/2 + selectionBounds.x + camera.x
    const y = selectionBounds.y + camera.y
    return(
        <div
        style={
            {
                transform : `translate(
                calc(${x}px - 50%),
                calc(${y - 16}px - 100%)
                )`
            }
        }
         className='absolute p-3 rounded-xl shadow-sm bg-white select-none border flex'>
          <ColorPicker
          onchange = {setFill}
          />
          <div className='flex flex-col gap-y-0.5'>
            <Hint label='Bring to front'>
                <Button onClick={handleMoveToFront} variant="board" size="icon">
                    <BringToFront/>
                </Button>

            </Hint>
            <Hint label='Move to Back'>
                <Button 
                onClick={handleMoveToBack}
                 variant="board" size="icon">
                   <SendToBack/>
                </Button>

            </Hint>


          </div>
        <div className='flex items-center ml-2 pl-2 border-l border-neutral-200'>
            <Hint label='Delete'>
                <Button onClick={deleteLayers} variant="board" size="icon">
                    <Trash2/>

                </Button>
            </Hint>

        </div>
        </div>

        
        

    )

})

export default Selectiontool



