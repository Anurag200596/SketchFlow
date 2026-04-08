import React from 'react'
import Canvas from './_components/Canvas'
import { Room } from '@/components/Room'
import { Loading } from './_components/Loading'


export default async function Page({ params }: { params: Promise<{ boardId: string }> }) {
    const { boardId } = await params;
  return (
    <Room  roomId= {boardId} fallback={<Loading/>}>
    <Canvas boardId = {boardId}/>
    </Room>
  )
}


