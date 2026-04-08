"use client"


import React from 'react'
import { Tool } from './ToolButton'
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from 'lucide-react'
import { canvasMode, canvasState, LayerType } from '@/Types/Canvas'



interface toolbaraProps{
   canvasState : canvasState,
  setCanvasState: React.Dispatch<React.SetStateAction<canvasState>>;

   undo : ()=>void,
   redo : ()=>void
   canUndo : boolean,
   canRedo : boolean
}

const Toolbar = ({
   canvasState,
   setCanvasState,
   undo,
   redo,
   canUndo,
   canRedo
}:toolbaraProps) => {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
        <div className='bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
        <Tool 
            label='Select'
            icon={MousePointer2}
            onClick={() => setCanvasState({mode: canvasMode.None})}
            isActive = {
               canvasState.mode === canvasMode.None ||
               canvasState.mode === canvasMode.SelectionNet||
               canvasState.mode === canvasMode.Pressing||
               canvasState.mode === canvasMode.Translating||
               canvasState.mode === canvasMode.Resizing
            }
            />
               <Tool 
            label='Text'
            icon={Type}
            onClick={() => setCanvasState({
               mode:canvasMode.Inserting,
               layerType : LayerType.Text
            })}
            isActive = {
               canvasState.mode === canvasMode.Inserting && canvasState.layerType === LayerType.Text
            }
            />
               <Tool 
            label='Sticky Notes'
            icon={StickyNote}
            onClick={() =>setCanvasState({
               mode:canvasMode.Inserting,
               layerType : LayerType.Note
            })}
            isActive = { canvasState.mode === canvasMode.Inserting && canvasState.layerType === LayerType.Note}
            />
               <Tool 
            label='Rectangle'
            icon={Square}
            onClick={() => setCanvasState({
               mode:canvasMode.Inserting,
               layerType : LayerType.Rectangle
            })}
            isActive = { canvasState.mode === canvasMode.Inserting && canvasState.layerType === LayerType.Rectangle}
            />
               <Tool 
            label='Ellipse'
            icon={Circle}
            onClick={() =>setCanvasState({
               mode:canvasMode.Inserting,
               layerType : LayerType.Ellipse
            })}
            isActive = {canvasState.mode === canvasMode.Inserting && canvasState.layerType === LayerType.Ellipse}
            />
               <Tool 
            label='pen'
            icon={Pencil}
            onClick={() =>setCanvasState({
               mode:canvasMode.Pencil
            })}
            isActive = {canvasState.mode === canvasMode.Pencil }
            />


        </div>
        <div className='bg-white rounded-md p-1.5  items-center shadow-md'>
        <Tool 
            label='Undo'
            icon={Undo2}
            onClick={undo}
            isdisabled = {!canUndo}
            />
               <Tool 
            label='Redo'
            icon={Redo2}
            onClick={redo}
            isdisabled = {!canRedo}
            />
          

            </div>
      
    </div>
  )
}

export const ToolbarSkeleton = ()=>{
    return(
        <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md'>
            </div>
        
    )
}

export default Toolbar
