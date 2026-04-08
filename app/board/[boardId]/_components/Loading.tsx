import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
import { ParticipantsSkeleton } from "./Participants";
import { InfoSkeleton } from "./Info";
import { ToolbarSkeleton } from "./Toolbar";

export const Loading = ()=>{
    return(
        <main className="h-full wfull relative bg-neutral-100 touch-none flex items-center justify-center">
            <Loader className="h-6 w-6 text-muted-foreground animate-spin"/>
            <ParticipantsSkeleton/>
            <InfoSkeleton/>
            <ToolbarSkeleton/>

        </main>
    )
}
