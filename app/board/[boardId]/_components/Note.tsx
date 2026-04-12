import { Kalam } from "next/font/google";

import ContentEditable,{ContentEditableEvent} from "react-contenteditable"


import { NoteLayer } from "@/Types/Canvas";
import { useMutation } from "@liveblocks/react";
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";

const kalam = Kalam({
    subsets : ["latin"],
    weight : ["400"]
})

interface NoteProps{
    id:string,
    layer:NoteLayer,
    onPointerDown : (e:React.PointerEvent,id:string) => void
    selectionColor? : string
}

const calculateFontSize = (width:number,height:number) =>{
    const maxFontsize = 96;
    const scaleFactor = 0.15
    const fontSizeBasedOnHeight = height * scaleFactor
    const fontSizeBasedOnwidth = width * scaleFactor

    return Math.min(
        maxFontsize,
        fontSizeBasedOnHeight,
        fontSizeBasedOnHeight
    )
    
}


export const Notelayer = ({
    id,
    onPointerDown,
    selectionColor,
    layer
}:NoteProps) =>{

    
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
            outline: selectionColor ? `2px solid ${selectionColor}` : "none",
            background : fill ? colorToCss(fill) : "#000"
        }}
        className="shadow-md drop-shadow-xl"
        ><ContentEditable
        style={{
            fontSize: calculateFontSize(height,width),
            color: fill ? getContrastingTextColor(fill) : "#000",
        }}
        className={cn(
            "h-full w-full flex items-center justify-center text-center outline-none",kalam.className
        )}
        html={value || "Text"}
        onChange={handleContentChange}
        />
        </foreignObject>
    )


}