"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/Types/Canvas";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <LiveblocksProvider  throttle={16} authEndpoint="/api/liveblocks-auth">
      <RoomProvider
      initialStorage={
        {
          layers : new LiveMap<string,LiveObject<Layer>>(),
          layerIds : new  LiveList([])
        }

      }
       id={roomId} initialPresence={{cursor:null,selection : [],pencilDraft:null,pencilColor:null}}>
        <ClientSideSuspense fallback={fallback}>
         {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
