"use client"


import React, { useCallback, useMemo, useState } from 'react'
import { nanoid } from "nanoid"
import Info from './Info'
import Participants from "./Participants"
import Toolbar from './Toolbar'
import { useCanRedo, useCanUndo, useHistory, useMutation, useSelf } from '@liveblocks/react/suspense'
import { camera, canvasMode, canvasState, color, LayerType, point, side, XYWH } from '@/Types/Canvas'
import CursorsPresence from './CursorsPresence'
import { colorToCss, connectionIdToBorderColor, findIntersectingLayersWithRectangle, penPointsToPathLayer, PointerEventToCanvasPoint, resizeBounds } from '@/lib/utils'
import { useOthersMapped, useStorage } from '@liveblocks/react'
import { LiveObject } from '@liveblocks/node'
import LayerPreview from './LayerPreview'
import SelectionBox from './SelctionBox'
import Selectiontool from './Selection-tool'
import { Path } from './Path'

interface canvasProps {
  boardId: string
}
const Canvas = ({ boardId }: canvasProps) => {
  
  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()
  
  const MAX_LAYERS = 100
  
  const layerIds = useStorage((root) => root.layerIds)
  const [lastUsedColor, setlastUsedColor] = useState<color>({
    r: 0,
    g: 0,
    b: 0
  });
    const [canvasState, setCanvasState] = useState<canvasState>({
      mode: canvasMode.None
    }
    );

  const pencilDraft = useSelf((me) => me.presence.pencilDraft)

  const [camera, setcamera] = useState<camera>({ x: 0, y: 0 });

  // const onWheel = useCallback((e: React.WheelEvent)=>{
  //   setcamera({
  //     x : camera.x - e.deltaX,
  //     y : camera.y - e.deltaY
  //   })

  // },[])
  const onWheel = useCallback((e: React.WheelEvent) => {
    setcamera((prev) => ({
      x: prev.x - e.deltaX,
      y: prev.y - e.deltaY
    }));
  }, []);


  const insertLayer = useMutation(({
    storage, setMyPresence },
    layerType: LayerType.Rectangle | LayerType.Text | LayerType.Ellipse | LayerType.Note,
    position: point
  ) => {
    const livelayers = storage.get("layers")

    if (livelayers.size > MAX_LAYERS) {
      return
    }

    const liveLayerIds = storage.get("layerIds")
    const layerId = nanoid()
    const layer = new LiveObject({
      type: layerType,
      x: position.x,
      y: position.y,
      height: 100, // default
      width: 100, // default
      fill: lastUsedColor
    })

    liveLayerIds.push(layerId)
    livelayers.set(layerId, layer)

    setMyPresence({
      selection: [layerId]
    },
      {
        addToHistory: true
      })

    setCanvasState({ mode: canvasMode.None })

  }, [lastUsedColor
  ])
  


  const onPointerLeave = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    setMyPresence({ cursor: null })

  }, [])

  const startDrawing = useMutation(({
    setMyPresence
  }, point: point, pressure: number) => {
    setMyPresence({
      pencilDraft: [[point.x, point.y, pressure]],
      pencilColor: lastUsedColor
    })

  }, [lastUsedColor])

  const onPointerDown2 = useCallback(
    (e: React.PointerEvent) => {
      const point = PointerEventToCanvasPoint(e, camera)
      if (canvasState.mode === canvasMode.Inserting) {
        return
      }
      if (canvasState.mode == canvasMode.Pencil) {
        startDrawing(point, e.pressure)
        return;
      }
      setCanvasState({ origin: point, mode: canvasMode.Pressing })
    },
    [camera, canvasState.mode, setCanvasState, startDrawing],
  );

  const deSelect = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true })
    }

  }, [])

  const insertPath = useMutation(({
    setMyPresence, self, storage
  },) => {
    const liveLayers = storage.get("layers")
    const { pencilDraft } = self.presence
    if (pencilDraft === null ||
      pencilDraft.length < 2 ||
      liveLayers.size >= MAX_LAYERS
    ) {
      return
    }

    const id = nanoid()

    liveLayers.set(id, new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor)))

    const livelayerIds = storage.get("layerIds")
    livelayerIds.push(id)
    setMyPresence({ pencilDraft: null })
    setCanvasState({ mode: canvasMode.Pencil })

  }, [lastUsedColor])

  const onPointerUp = useMutation(({ },
    e
  ) => {
    const point = PointerEventToCanvasPoint(e, camera)
    if (canvasState.mode === canvasMode.None || canvasState.mode == canvasMode.Pressing) {
      deSelect()
      setCanvasState({ mode: canvasMode.None })
    }
    else if (canvasState.mode === canvasMode.Pencil) {
      insertPath();
    }
    else if (canvasState.mode === canvasMode.Inserting) {
      insertLayer(canvasState.layerType, point)
    }
    else {
      setCanvasState({
        mode: canvasMode.None
      })
    }

    history.resume()

  }, [
    camera,
    insertLayer,
    history,
    canvasState,
    insertPath,
    setCanvasState
  ])

  const translateLayer = useMutation((
    { storage, self },
    point: point
  ) => {
    if (canvasState.mode !== canvasMode.Translating) return;
    const offset = {
      x: point.x - canvasState.current.x,
      y: point.y - canvasState.current.y
    }

    const liveLayers = storage.get("layers")

    for (const id of self.presence.selection) {
      const layer = liveLayers.get(id)

      if (layer) {
        layer.update({
          x: layer.get("x") + offset.x,
          y: layer.get("y") + offset.y
        })
      }
    }

    setCanvasState({ mode: canvasMode.Translating, current: point })

  }, [canvasState])



  const resizeLayer = useMutation(({
    self, storage
  }, point: point) => {

    if (canvasState.mode !== canvasMode.Resizing) return;

    const bounds = resizeBounds(canvasState.initialBounds, canvasState.corner, point)

    const liveLayers = storage.get("layers")
    const layer = liveLayers.get(self.presence.selection[0])

    if (layer) {
      layer.update(bounds)
    }

  }, [canvasState])

  const updateSelectionNet = useMutation(({
    storage, setMyPresence
  }, current: point, origin: point) => {
    const layers = storage.get("layers").toImmutable()
    setCanvasState({ mode: canvasMode.SelectionNet, current, origin })
    const ids = findIntersectingLayersWithRectangle(layerIds!, layers, origin, current)
    setMyPresence({ selection: ids })
  }, [layerIds])

  // const startMultiSelection = useCallback((current:point,origin : point)=> {

  //   if(Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5){
  //     setCanvasState({mode: canvasMode.SelectionNet,origin})
  //   }

  // },[])
  const startMultiSelection = useCallback((current: point, origin: point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({
        mode: canvasMode.SelectionNet,
        origin,
        current,
      });
    }
  }, []);

  const continueDrawing = useMutation(({
    self, setMyPresence
  }, point: point, e: React.PointerEvent) => {

    const { pencilDraft } = self.presence

    if (canvasState.mode !== canvasMode.Pencil || e.buttons != 1 || pencilDraft == null
    ) { return }
    setMyPresence({
      cursor: point,
      pencilDraft:
        pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y ? pencilDraft : [...pencilDraft, [point.x, point.y, e.pressure]]
    })

  }, [canvasState.mode])

  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault()

    const current = PointerEventToCanvasPoint(e, camera)

    if (canvasState.mode === canvasMode.Pressing) {
      startMultiSelection(current, canvasState.origin);
    } else if (canvasState.mode === canvasMode.SelectionNet) {
      updateSelectionNet(current, canvasState.origin);
    } else if (canvasState.mode === canvasMode.Translating) {
      translateLayer(current);
    } else if (canvasState.mode === canvasMode.Resizing) {
      resizeLayer(current);
    } else if (canvasState.mode === canvasMode.Pencil) {
      continueDrawing(current, e);
    }

    setMyPresence({ cursor: current })



  }, [continueDrawing, camera, startMultiSelection, updateSelectionNet, canvasState, resizeLayer, translateLayer])




  // Get the selections of all other connected users from Liveblocks
  // `useOthersMapped` maps over all other users and extracts their presence.selection
  const selections = useOthersMapped(
    (other) => other.presence.selection
  );

  // Map layer IDs to the color of the user who selected them
  // Memoized so it only recalculates when `selections` change
  const layerIdsToColorSelection = useMemo(() => {
    // Temporary object to build mapping from layerId -> user color
    const layerIdsToColorSelection: Record<string, string> = {};

    // Loop over each other user's selection
    for (const user of selections) {
      // Destructure the array: 
      // connectionId = ID of the other user
      // selection = array of layer IDs this user has selected
      const [connectionId, selection] = user;

      // Loop over each layer that this user has selected
      for (const layerId of selection) {
        // Map this layer ID to the border color of the user
        // This allows us to show the user's color on the selected layer
        layerIdsToColorSelection[layerId] = connectionIdToBorderColor(connectionId);
      }
    }

    // Return the final mapping: layerId -> user color
    return layerIdsToColorSelection;
  }, [selections]); // Recalculate only when `selections` change

  /**
   * ✅ What the code does
   *
   * This code produces a final object that maps:
   *
   *    layerId → colorOfUserWhoSelectedIt
   *
   * Example output:
   *
   * {
   *   "layer_12": "#FF5733",
   *   "layer_27": "#00A3FF",
   *   "layer_90": "#8D33FF"
   * }
   *
   */



  /**
   * Handler for pointer-down events on a canvas layer.
   * 
   * This function does the following:
   * 1️⃣ Handles selecting a layer when a user clicks on it.
   * 2️⃣ Initiates translating (dragging) the selected layer.
   * 3️⃣ Updates Liveblocks presence so other collaborators see this user's selection.
   * 
   * It ignores pointer events in modes where other interactions are active (Inserting or Pencil).
   */
  const onPointerDown = useMutation((
    { self, setMyPresence },    // Liveblocks context: current user and function to update their presence
    e: React.PointerEvent,       // Pointer event triggered by user click
    layerId: string              // ID of the layer that was clicked
  ) => {

    // 1️⃣ Ignore pointer events if the canvas is in "Inserting" or "Pencil" mode.
    // These modes have their own pointer handling, so we exit early.
    if (canvasState.mode === canvasMode.Inserting ||
      canvasState.mode === canvasMode.Pencil) return;

    // 2️⃣ Pause undo/redo history temporarily
    // Prevents dragging the layer from creating unwanted history entries
    history.pause();

    // 3️⃣ Stop event propagation
    // Prevents parent handlers or other layers from responding to the same pointer event
    e.stopPropagation();

    // 4️⃣ Convert pointer coordinates to canvas coordinates
    // This accounts for camera position/zoom to get the correct canvas point
    const point = PointerEventToCanvasPoint(e, camera);

    // 5️⃣ Update user presence if the clicked layer is not already selected
    // Liveblocks tracks collaborative selections in real-time
    if (!self.presence.selection.includes(layerId)) {
      setMyPresence(
        { selection: [layerId] },   // Update the current user's selection to this layer
        { addToHistory: true }       // Optionally add this change to history
      );
    }

    // 6️⃣ Update canvas state to start translating (dragging) the layer
    // mode: Translating → user is moving the layer
    // current: starting pointer position in canvas coordinates
    setCanvasState({
      mode: canvasMode.Translating,
      current: point
    });

  }, [
    /**
     * Dependency array: determines when the function should be recreated
     * 
     * React will **recreate** this function if any of these values change,
     * so it always has the latest values when called. It does **not execute automatically**.
     */

    setCanvasState,  // Updates the canvas state when dragging begins
    camera,          // Used to convert pointer events to canvas coordinates
    history,         // Used to pause undo/redo history
    canvasState.mode // Determines whether pointer events should be handled or ignored
  ]);

  const onResizeHandlePointerDown = useCallback(
    (corner: side, initialBounds: XYWH) => {
      history.pause()
      setCanvasState({
        mode: canvasMode.Resizing,
        initialBounds,
        corner
      })

    },
    [history],
  );





  const { name, picture } = useSelf((me) => me.info);
  console.log(name, picture)
  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      <Selectiontool
        camera={camera}
        setLastUsedColor={setlastUsedColor}
      />
      <svg
        onWheel={onWheel}
        onPointerMove={(e) => onPointerMove(e)}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown2}
        className='h-screen w-screen'>
        <g
          style={
            {
              transform: `translate(${camera.x}px,${camera.y}px)`
            }
          }
        >


          {
            layerIds?.map((layerId) => (
              <LayerPreview
                key={layerId}
                id={layerId}
                selectionColor={layerIdsToColorSelection[layerId]} // to indicate somone is moving some article on the board
                onLayerPointerDown={onPointerDown}
              />
            ))
          }


          <SelectionBox
            onResizeHandlePointerDown={onResizeHandlePointerDown}
          />

          {
            canvasState.mode == canvasMode.SelectionNet && canvasState.current != null && (
              <rect
                className=' fill-blue-500/5 stroke-blue-500 stroke-1'
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
              />

            )
          }

          <CursorsPresence />
          {
            pencilDraft != null && pencilDraft.length > 0 && (
              <Path
                points={pencilDraft}
                fill={colorToCss(lastUsedColor)}
                x={0}
                y={0}
              />
            )
          }

        </g>
      </svg>
    </main>
  )
}

export default Canvas
