import { Hint } from "@/components/hints";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "../../../../components/ui/avatar"

interface userAvatarProps{
    src? :string,
    name? : string,
    fallback? :string,
    borderColor? : string
}

export const UserAvatar = ({src,name,fallback,borderColor} : userAvatarProps)=>{
    return(
        <Hint 
        label={name || "Teammate"} side="bottom" sideOffset={18}
        >
            <Avatar
            style={
                {
                    borderColor : borderColor
                }
            }
             className="h-8 w-8 border-3">
                <AvatarImage src={src}/>
                <AvatarFallback className="text-xs font-semibold">
                    {fallback}

                </AvatarFallback>

            </Avatar>

        </Hint>
    )

}