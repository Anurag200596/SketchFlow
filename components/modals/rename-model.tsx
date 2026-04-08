"use client"

import { useRenameModel } from "@/Store/rename-model"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogClose,
    DialogHeader,
    DialogTitle
} from "../../components/ui/dialog"
import { FormEventHandler, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { mutation } from "@/convex/_generated/server"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { toast } from "sonner"

export const RenameModal = () =>{
    const {
        isOpen,
        onClose,
        initialValues,
        } = useRenameModel()

    const update = useMutation(api.board.update)

    const onSubmit :FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault()

        if (!initialValues.id) return; 

        update({
          id: initialValues.id,
          title: title,
        })
        .then((id)=>{
            toast.success("Board Renamed Successfully")
            onClose()

        })
        .catch((error)=> toast.error("Board not Reanamed"))
        

    }

    const [title, settitle] = useState(initialValues.title);

    useEffect(() => {
        settitle(initialValues.title)
    }, [initialValues.title]);

    return(
        <Dialog open = {isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Board Title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new Title for this Board
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                    disabled= {false}
                    required
                    maxLength={60}
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                    placeholder="Board Title"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant={"outline"}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled= {false} type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                  
                </form>
            </DialogContent>

        </Dialog>
    )
}

