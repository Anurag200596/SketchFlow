import { getSvgPathFromStroke } from "@/lib/utils"
import getStroke  from "perfect-freehand"

interface PathProps {
    x:number,
    y:number,
    stroke? : string,
    points: number[][] 
    onPointerDown? : (e: React.PointerEvent) => void
    fill :string
}

export const Path = ({
    x,
    y,
    stroke,
    fill,
    onPointerDown,
    points
}: PathProps) => {
    return (
        <path
        className="drop-shadow-md" 
        onPointerDown={onPointerDown}
        d = {
            getSvgPathFromStroke(getStroke(points,{
                size:15,
                thinning : 0.5,
                smoothing : 0.5,
                streamline : 0.5
            }))
        }
        style={{
            transform : `translate(${x}px,${y}px)`
        }}
        x={x}
        y={y}
        fill={fill}
        strokeWidth={1}

        />
    )

}