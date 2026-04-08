import { camera, color, Layer, LayerType, PathLayer, point, side, XYWH } from "@/Types/Canvas";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const colors = [
  "#FF5733", // Red-Orange
  "#33FF57", // Green
  "#3357FF", // Blue
  "#FF33A8", // Pink
  "#33FFF0", // Cyan
  "#F0FF33", // Yellow
  "#FF8F33", // Orange
  "#8F33FF", // Purple
  "#FF3333", // Red
  "#33FF8F"  // Mint Green
];

export const connectionIdToBorderColor = (connectionID : number) : string=>{
  return colors[connectionID % colors.length]

}

export function PointerEventToCanvasPoint(e:React.PointerEvent,camera : camera){
  return({
    x : Math.round(e.clientX) - camera.x,
    y : Math.round(e.clientY) - camera.y
  })
}


export function colorToCss(color: color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g
    .toString(16)
    .padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function resizeBounds(bounds: XYWH, corner: side, point: point): XYWH {
  // Create a copy of the original rectangle to store the result
  const result = {
    x: bounds.x,       // current left edge
    y: bounds.y,       // current top edge
    width: bounds.width,   // current width
    height: bounds.height, // current height
  };

  // ------------------ LEFT EDGE ------------------
  // Check if the user is dragging the left side (or left corners)
  if ((corner & side.left) === side.left) {
    // Update left edge (x) to follow mouse, but never go past the right edge
    result.x = Math.min(point.x, bounds.x + bounds.width);

    // Update width = distance between right edge (fixed) and new left edge
    // Math.abs ensures width is always positive even if left crosses right
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  // ------------------ RIGHT EDGE ------------------
  // Check if the user is dragging the right side (or right corners)
  if ((corner & side.right) === side.right) {
    // Update left edge if necessary when dragging right (to handle flipping)
    result.x = Math.min(point.x, bounds.x);

    // Update width = distance between left edge (fixed) and mouse
    result.width = Math.abs(point.x - bounds.x);
  }

  // ------------------ TOP EDGE ------------------
  // Check if the user is dragging the top side (or top corners)
  if ((corner & side.top) === side.top) {
    // Update top edge (y) to follow mouse, but never go past bottom edge
    result.y = Math.min(point.y, bounds.y + bounds.height);

    // Update height = distance between bottom edge (fixed) and new top edge
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  // ------------------ BOTTOM EDGE ------------------
  // Check if the user is dragging the bottom side (or bottom corners)
  if ((corner & side.bottom) === side.bottom) {
    // Update top edge if necessary when dragging bottom (to handle flipping)
    result.y = Math.min(point.y, bounds.y);

    // Update height = distance between top edge (fixed) and mouse
    result.height = Math.abs(point.y - bounds.y);
  }

  // Return the new resized rectangle
  return result;
}

export function findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: point,
  b: point
) {
  // Create a normalized selection rectangle from points a and b
  // (works even if user drags in any direction)
  const rect = {
    x: Math.min(a.x, b.x),              // left side of selection
    y: Math.min(a.y, b.y),              // top side of selection
    width: Math.abs(a.x - b.x),         // width of selection
    height: Math.abs(a.y - b.y),        // height of selection
  };

  const ids = []; // will store all layers that intersect with the selection

  // Loop through all layer IDs (in stacking order)
  for (const layerId of layerIds) {
    const layer = layers.get(layerId); // get the actual layer object

    if (layer == null) {
      continue; // skip if layer doesn't exist
    }

    // Destructure the layer's rectangle info
    const { x, y, height, width } = layer;

    // ***** RECTANGLE INTERSECTION CHECK *****
    //
    // These 4 conditions ensure the selection rectangle (rect)
    // overlaps the layer rectangle (x, y, width, height)
    // on both X and Y axes.
    //
    // rect.x + rect.width   → right edge of selection
    // rect.x                → left edge of selection
    // rect.y + rect.height  → bottom edge of selection
    // rect.y                → top edge of selection
    //
    // x + width             → right edge of layer
    // x                     → left edge of layer
    // y + height            → bottom edge of layer
    // y                     → top edge of layer

    if (
      rect.x + rect.width > x &&     // selection's right edge is to the right of layer's left edge
      rect.x < x + width &&          // selection's left edge is to the left of layer's right edge
      rect.y + rect.height > y &&    // selection's bottom edge is below layer's top edge
      rect.y < y + height            // selection's top edge is above layer's bottom edge
    ) {
      // If all 4 conditions are true → rectangles overlap
      ids.push(layerId);
    }
  }

  return ids; // return all intersecting layer IDs
}

export function getContrastingTextColor(color: color) {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

  return luminance > 182 ? "black" : "white";
}

export function penPointsToPathLayer(
  points: number[][],
  color: color
): PathLayer {
  if (points.length < 2) {
    throw new Error("Cannot transform points with less than 2 points");
  }

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (left > x) {
      left = x;
    }

    if (top > y) {
      top = y;
    }

    if (right < x) {
      right = x;
    }

    if (bottom < y) {
      bottom = y;
    }
  }

  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
}


export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
}

