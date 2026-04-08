"use Client"

import { colorToCss } from "@/lib/utils"
import { color } from "@/Types/Canvas"

interface ColorButtonProps {
    onClick: (color: color) => void,
    color: color
}

const ColorButton = ({
    onClick,
    color
}: ColorButtonProps) => {
    return (
      <button
      onClick={() => onClick(color)}
       className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition">
        <div
        style={{
            background: colorToCss(color)
        }}
         className="w-8 h-8 rounded-md border border-neutral-300 ">

        </div>

      </button>
    )

}

interface ColorProps {
    onchange: (color: color) => void
}


export const ColorPicker = ({
    onchange
}: ColorProps) => {
    // #F5F5F5
    return (
        <div className="flex flex-wrap items-center gap-2 max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
            <ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={onchange} />
            <ColorButton color={{ r: 255, g: 249, b: 177 }} onClick={onchange} />
            <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onchange} />
            <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onchange} />
            <ColorButton color={{ r: 155, g: 105, b: 245 }} onClick={onchange} />
            <ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={onchange} />
            <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onchange} />
            <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onchange} />
            <ColorButton color={{ r: 245, g: 245, b: 245 }} onClick={onchange} />
        </div>
    )

}



// -------------------- Color Change Flow Explanation --------------------

// 1️⃣ Layer Selection
// - User selects one or more shapes on the canvas.
// - The app stores the IDs of these selected layers in `selection`.
// - This determines which layers will be affected by any color changes.

// 2️⃣ Displaying the Selection Tool
// - When at least one layer is selected, the Selection Tool UI appears above the selection.
// - It uses the bounding box of the selected layers (`selectionBounds`) and camera offsets to position itself correctly.
// - The Selection Tool contains the Color Picker, which shows multiple color options as clickable squares.

// 3️⃣ Picking a Color
// - The user clicks a color square in the Color Picker.
// - Each square (ColorButton) sends the clicked color to the callback function (`setFill`).

// 4️⃣ `setFill` Function Execution
// - Receives the clicked color as an argument.
// - Updates the UI state `lastUsedColor` so the app remembers the most recently picked color (for previews).
// - Loops through all selected layer IDs in `selection`.
// - Updates the `fill` property of each selected layer to the new color.
// - Because layers are stored in reactive storage (like Liveblocks), updating `fill` triggers automatic canvas re-render.

// 5️⃣ Reactive Canvas Update
// - The canvas automatically re-renders affected layers with the new color.
// - The user sees selected shapes change color in real-time.

// 6️⃣ UI Synchronization
// - The `lastUsedColor` state ensures any UI component showing the current color (e.g., toolbar preview) updates immediately.
// - Keeps the UI consistent with the canvas state.

// 7️⃣ Summary Flow
// - User selects layers → selection IDs stored.
// - Render Selection Tool → appears above selected shapes.
// - Click a color → ColorButton triggers `setFill`.
// - `setFill` updates lastUsedColor and selected layers’ fill property.
// - Reactive storage updates canvas → user sees instant visual feedback.

// -------------------- Key Points --------------------
// - `selection` determines which layers are affected.
// - `storage` ensures reactive updates for live canvas rendering.
// - `setLastUsedColor` updates the UI preview, not the canvas.
// - Flow is unidirectional: User Click → setFill → Update Layers & UI → Canvas renders.
