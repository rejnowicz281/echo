"use client";

import { Button } from "@/components/shadcn/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { IoMdPersonAdd } from "@react-icons/all-files/io/IoMdPersonAdd";
import { useState } from "react";
import MainContent from "./main-content";

const AddContactButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="rounded-2xl flex flex-row gap-2 items-center border">
                    <IoMdPersonAdd />
                    Add Contact
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Contact</DialogTitle>
                    <DialogDescription>Here you can search for users to chat with.</DialogDescription>
                </DialogHeader>

                <MainContent closeDialog={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};

export default AddContactButton;
