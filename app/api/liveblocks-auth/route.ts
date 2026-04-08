import { Liveblocks } from "@liveblocks/node";
// import { ConvexHttpClient } from "convex/browser";
import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_URL!
);
const liveblocks = new Liveblocks({
  secret: "sk_dev_cwvu0MDz7nE4lH-rPcH40wDZiUrp_NhqyjtQN0ub-TBi4YqgIJOof1EBZB8A0qow",
 
});

export async function POST(request: Request) {
    const authorization = await auth()
    const user = await currentUser()

    if(!authorization || !user){
        return new Response("Unauthorized",{status:403})
    } 

    const {room} = await request.json();
    if (!room) {
        return new Response("Missing room", { status: 400 });
      }

    // const board = await convex.query(api.board.get,{id:room})
    // if (!board) {
    //     return new Response("Board not found", { status: 404 });
    //   }
      

    // if(board?.orgId !== authorization.orgId){
    //     return new Response("Unauthorised",{status:403})
    // }

    const userInfo = {
        name: user.firstName!,
        picture : user.imageUrl!
    }
    const session = liveblocks.prepareSession(
        user.id,
        {userInfo}
    )
    if(room){
        session.allow(room,session.FULL_ACCESS)

    }

    const { status, body } = await session.authorize();
    return new Response(body, { status });

}
