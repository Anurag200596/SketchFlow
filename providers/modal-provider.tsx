// Tells Next.js this component should run on the client (browser)
// Required because we are using React hooks like useState and useEffect
"use client"

// Import the RenameModal component (the actual UI for renaming)
import { RenameModal } from "@/components/modals/rename-model"

// Import React hooks
// useState → to track if component is mounted
// useEffect → to run code after component mounts
import { useEffect, useState } from "react"

// This component will be placed at the root (like in layout)
// Its job is to render modals globally
export const ModalProvider = ()=>{

    // State to track whether component has mounted on client
    // Starts as false (important for avoiding hydration issues)
    const [isMounted, setisMounted] = useState(false);

    // Runs only once after component mounts (because dependency array is empty [])
    useEffect(() => {
        // Once mounted, set isMounted to true
        // This ensures rendering happens only on the client
        setisMounted(true)
      
    }, []);

    // If component is not mounted yet, render nothing
    // This prevents hydration mismatch between server and client
    if(!isMounted) return null

    // Once mounted, render the modal
    // Modal will still be controlled (shown/hidden) using Zustand state
    return(
        <>
            <RenameModal/>
        </>
    )
}