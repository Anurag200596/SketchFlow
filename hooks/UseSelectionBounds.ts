import { Layer, XYWH } from "@/Types/Canvas";
import { shallow, useSelf, useStorage } from "@liveblocks/react";

// Function to calculate the smallest rectangle that completely contains all given layers
const boundingBox = (layers: Layer[]): XYWH | null => {
  const first = layers[0]; // Get the first layer as a starting reference

  if (!first) return null; // If no layers exist, return null (nothing to bound)

  // Initialize the bounding box edges using the first layer
  let left = first.x;
  let right = first.x + first.width;
  let top = first.y;
  let bottom = first.y + first.height;

  // Loop through remaining layers to expand the bounding box if needed
  for (let i = 1; i < layers.length; i++) {
    const { x, y, width, height } = layers[i];

    // Update left edge if current layer is further left
    if (left > x) {
      left = x;
    }

    // Update right edge if current layer extends further right
    if (right < x + width) {
      right = x + width;
    }

    // Update top edge if current layer is higher (smaller y)
    if (top > y) top = y;

    // Update bottom edge if current layer extends lower
    if (bottom < y + height) bottom = y + height;
  }

  // Return the final bounding box in XYWH format
  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
};

// React hook to compute the bounding box of the current user's selection
export const useSelectionBounds = () => {
  // Get the current user's selection from Liveblocks presence
  const selection = useSelf((me) => me.presence.selection);

  // Access shared storage (all layers on canvas) and calculate bounding box
  return useStorage((root) => {
    // Convert selected layer IDs into actual Layer objects from storage
    const selectedLayers = (selection ?? [])
      ?.map((layerId : string) => root.layers.get(layerId)!)
      .filter(Boolean); // Remove any undefined layers (safety)

    // Compute and return the bounding box for all selected layers
    return boundingBox(selectedLayers);
  }, shallow); // Shallow comparison optimization explained below
};

/* 
Explanation about useStorage hook:

- useStorage is a Liveblocks hook that allows you to access **shared collaborative state** in real-time.
- It provides a `root` object representing the **global shared storage** (e.g., all layers on the canvas).
- You can read data from storage (like layer positions, sizes, colors) and return computed values.
- Any changes in the relevant part of storage automatically trigger reactive updates for components using this hook.
- In this code, useStorage is used to:
    1. Access all canvas layers (`root.layers`).
    2. Retrieve the actual layer objects for the user’s selection.
    3. Calculate a reactive bounding box that updates whenever layers or selection changes.

Explanation about shallow:

- `shallow` is a helper for **shallow comparison** of objects returned by useStorage.
- Normally, Liveblocks triggers a re-render whenever the returned object is a **new reference**, even if its contents didn't change.
- Using `shallow` compares the **actual properties** of the object instead of the reference.
- Example in this code:
    - `boundingBox(selectedLayers)` returns `{ x, y, width, height }`.
    - Without `shallow`, every time this object is recreated, React would re-render unnecessarily.
    - With `shallow`, React only re-renders if **one of x, y, width, or height actually changed**.
- This improves performance, especially when working with collaborative canvas apps with many layers.
*/
