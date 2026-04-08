// Import the Id type from Convex → ensures correct typing for board IDs
import { Id } from "@/convex/_generated/dataModel";

// Import Zustand's create function → used to create global state
import { create } from "zustand";

// Default values used when modal is closed or reset
// id starts as null (no board selected)
// title starts empty
const defaultValues = { id: null as Id<"boards"> | null, title: "" };

// Interface defining the structure of the Zustand store
interface IRenameModel {
  // Controls whether the modal is open or closed
  isOpen: boolean;

  // Stores the current board's data (id + title)
  initialValues: typeof defaultValues;

  // Function to open the modal with a specific board's data
  onOpen: (id: Id<"boards">, title: string) => void;

  // Function to close the modal and reset state
  onClose: () => void;
}

// Create the Zustand store
export const useRenameModel = create<IRenameModel>((set) => ({

  // Initial state → modal is closed by default
  isOpen: false,

  // No board selected initially
  initialValues: defaultValues,

  // Function to open modal
  onOpen: (id, title) =>
    set({
      // Open the modal
      isOpen: true,

      // Store the selected board's id and title
      initialValues: { id, title },
    }),

  // Function to close modal
  onClose: () =>
    set({
      // Close the modal
      isOpen: false,

      // Reset data to default (important to avoid stale values)
      initialValues: defaultValues,
    }),
}));