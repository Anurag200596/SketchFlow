import { v } from "convex/values";

import { query } from "./_generated/server";
import {getAll, getAllOrThrow} from "convex-helpers/server/relationships"

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favourites : v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) throw new Error("Unauthorised")

            if(args.favourites){
                const favouriteBoards = await ctx.db.query("userFavourites").withIndex("by_user_org",(q)=>
                    q.eq("userId",identity.subject).eq("orgId", args.orgId)
                ).order("desc").collect()

                const ids = favouriteBoards.map((board) => board.boardId)

                const boards = await getAllOrThrow(ctx.db,ids)
                return boards.map((board)=>(
                    {
                        ...board,
                        isfavourite: true
                    }
                ))
                
                
            }

            const title = args.search as string
            let boards = []
            if(title){
                boards = await ctx.db.query("boards").withSearchIndex("searchTitle",(q)=>
                    q.search("title",title)
                .eq("orgId",args.orgId)).collect();   
            }
            else{

                boards = await ctx.db.query("boards").withIndex("by_org", (q) => q.eq("orgId", args.orgId)).order("desc").collect();

            }    
        



        const boardsWithFavouriteRelation = boards.map((board) => {
            return ctx.db.query("userFavourites").withIndex("by_user_board",(q)=>
                q.eq("userId",identity.subject).eq("boardId", board._id)).unique().then((favourite)=> {return{
                    ...board,
                    isfavourite : !!favourite
                }
                })              
        })

        const boardsWithFavouriteBoolean = await Promise.all(boardsWithFavouriteRelation)
       return boardsWithFavouriteBoolean
    }

})
