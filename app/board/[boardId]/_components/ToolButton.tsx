"use client"

import { LucideIcon } from "lucide-react"

import { Hint } from "@/components/hints"
import { Button } from "@/components/ui/button"

interface ToolProps{
    label : string,
    icon :LucideIcon,
    onClick: ()=>void,
    isActive? : boolean,
    isdisabled? : boolean
}

export const Tool = ({
    label,
    icon : Icon,
    onClick,
    isActive,
    isdisabled
}:ToolProps)=>{
    return(
        <Hint label={label} side="right" sideOffset={14}>
            <Button disabled= {isdisabled} onClick={onClick} size="icon" variant={isActive ? "boardActive" :"board" }>
                <Icon/>
            </Button>

        </Hint>
    )

}