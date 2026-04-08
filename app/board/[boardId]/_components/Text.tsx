import { Kalam } from "next/font/google";

import ContentEditable,{ContentEditableEvent} from "react-contenteditable"


import { TextLayer } from "@/Types/Canvas";
import { useMutation } from "@liveblocks/react";
import { cn, colorToCss } from "@/lib/utils";

const kalam = Kalam({
    subsets : ["latin"],
    weight : ["400"]
})

interface TextProps{
    id:string,
    layer:TextLayer,
    onPointerDown : (e:React.PointerEvent,id:string) => void
    selectionColor? : string
}

const calculateFontSize = (width:number,height:number) =>{
    const maxFontsize = 96;
    const scaleFactor = 0.5
    const fontSizeBasedOnHeight = height * scaleFactor
    const fontSizeBasedOnwidth = width * scaleFactor

    return Math.min(
        maxFontsize,
        fontSizeBasedOnHeight,
        fontSizeBasedOnHeight
    )
    
}


export const Textlayer = ({
    id,
    onPointerDown,
    selectionColor,
    layer
}:TextProps) =>{

    
const updateValue = useMutation(({storage},newValue : string) => {
    const livelayers = storage.get("layers")
    livelayers.get(id)?.set("value",newValue)


},[])

const handleContentChange = (e:ContentEditableEvent) =>{
    updateValue(e.target.value)

}

    const {x,y,height,width,fill,value} = layer
    return(
        <foreignObject
        x={x}
        y={y}
        height={height}
        width={width}
        onPointerDown={(e) => onPointerDown(e,id)}
        style={{
            outline: selectionColor ? `1px solid ${selectionColor}` : "none"
        }}
        ><ContentEditable
        style={{
            fontSize: calculateFontSize(height,width),
            color: fill ? colorToCss(fill) : "#000"
        }}
        className={cn(
            "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",kalam.className
        )}
        html={value || "Text"}
        onChange={handleContentChange}
        />
        </foreignObject>
    )


}