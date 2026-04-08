import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/Types/Canvas";

interface rectProps{
    id: string,
    layer: RectangleLayer,
    onPointerDown: (e: React.PointerEvent, id: string) => void,
    selectionColor?: string 
}

export const Rectangle = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}: rectProps) => {
    const { x, y, width, height, fill } = layer;

    return (
        <rect
            x={x}   // use real coordinates
            y={y}   // use real coordinates
            width={width}
            height={height}
            fill={fill ? colorToCss(fill)  : "#000"}
            stroke={ selectionColor || "transparent"}
            strokeWidth={2}
            onPointerDown={(e) => onPointerDown(e, id)}
        />
    )
}
