
export type color  =   { 
    r:number,
    g:number,
    b:number
}

export type camera = {
    x:number,
    y:number
}

export enum LayerType{
    Rectangle,
    Ellipse,
    Path,
    Note,
    Text
}

export type RectangleLayer = {
    type : LayerType.Rectangle,
    x:number,
    y:number,
    height:number,
    width : number,
    fill : color
    value? : string

}
export type EllipseLayer = {
    type : LayerType.Ellipse,
    x:number,
    y:number,
    height:number,
    width : number,
    fill : color
    value? : string

}

export type PathLayer = {
    type : LayerType.Path,
    x:number,
    y:number,
    height:number,
    width : number,
    fill : color
    value? : string,
    points: number[][]
}

export type TextLayer = {
    type : LayerType.Text,
    x:number,
    y:number,
    height:number,
    width : number,
    fill : color
    value? : string

}
export type NoteLayer = {
    type : LayerType.Note,
    x:number,
    y:number,
    height:number,
    width : number,
    fill : color
    value? : string

}

export type point = {
    x:number,
    y:number
}

export type XYWH = {
    x: number,
    y:number,
    width:number,
    height:number
}

export enum side{
    top = 1,
    bottom = 2,
    left = 4,
    right = 8
}





export type canvasState = 
    |
    {
        mode : canvasMode.None,
    }
    |
    {
        mode : canvasMode.SelectionNet,
        origin: point,
        current: point
    }
    |
    {
        mode : canvasMode.Translating,
        current:point
    }
    |
    {
        mode : canvasMode.Pressing,
        origin : point
    }
    |
    {
        mode: canvasMode.Resizing,
        initialBounds : XYWH,
        corner: side
    }
    |
    {
        mode: canvasMode.Inserting,
        layerType : LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note
    }
    |
    {
        mode : canvasMode.Pencil
    }



export enum canvasMode{
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil
}

export type Layer = RectangleLayer | EllipseLayer | PathLayer | TextLayer | NoteLayer