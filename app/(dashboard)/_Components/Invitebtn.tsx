import { OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";

import {
    Dialog,
    DialogTrigger,
    DialogContent
} from "../../../components/ui/dialog"
import { Button } from "@/components/ui/button";


export const Invite = ()=>{
    return (
        <div >
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="h-4 mr-2 w-4"></Plus>
                    Invite Members
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[450px]">
                <OrganizationProfile >

                </OrganizationProfile>
            </DialogContent>
        </Dialog>

        </div>
    )
}