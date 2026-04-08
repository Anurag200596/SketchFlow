import { Hint } from "@/components/hints";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

interface  Itemprop{
    id:string,
    name:string,
    imageurl:string
}

export const Item = ({
    id,name,imageurl
}:Itemprop)=>{
    const {organization} = useOrganization()
    const {setActive} = useOrganizationList()

    const isActive = organization?.id === id
    const onclick = ()=>{
        if(!setActive) return null;
        setActive({organization:id})
    }
    return (
        <div className="aspect-square relative">
            <Hint
            side="right"
            align="start"
            sideOffset={30} 
             label={name}>
            <Image 
            fill
            src={imageurl}
            alt="name"
            onClick={onclick}
            className={cn(
                "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition", isActive && "opacity-100"
            )}
            />

            </Hint>
        </div>
    )

}