"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Link2, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { Confirm } from "@/app/(dashboard)/_Components/Confirm"
import { Button } from "./ui/button"
import { useRenameModel } from "@/Store/rename-model"
interface actionProps{
    children : React.ReactNode,
    side? : DropdownMenuContentProps["side"]
    sideOffset? : DropdownMenuContentProps["sideOffset"],
    id:Id<"boards">,
    title:string
}
export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}:actionProps)=>{
    const {onOpen} = useRenameModel()
    const remove = useMutation(api.board.remove)
    const onclick = ()=>{
        remove({id})
        .then((id)=> toast.success("Board is Deleted"))
        .catch((error)=> toast.error("Failed to Delete Board"))
    }
    const oncopy = ()=>{
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
        .then(()=> toast.success("Link copied"))
        .catch(() => toast.error("Failed to copy the Link"))
    }
    return(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent
        onClick={(e)=> e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
        >
            <DropdownMenuItem
            onClick={oncopy}
             className="p-3 cursor-pointer">
                <Link2 className="h-4 w-4 mr-2"/>
                copy board link

            </DropdownMenuItem>
            <DropdownMenuItem
            onClick={() => onOpen(id,title)}
             className="p-3 cursor-pointer">
                <Pencil className="h-4 w-4 mr-2"/>
                Rename

            </DropdownMenuItem>
            <Confirm
            header = "Delete Board?"
            description="This will delete the Board and all its contents"
            disabled = {false}
            onConfirm = {onclick}
            >
            <Button
            variant="ghost"
             className="px-10 cursor-pointer text-sm w-full justify-start font-normal">
                <Trash2 className="h-4 w-4 mr-2"/>
               Delete Board{"       "}         

            </Button>

            </Confirm>

        </DropdownMenuContent>
      </DropdownMenu>
    )

}