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
import clsx from "clsx";
import { FC, useState } from "react";
import MainContent from "./main-content";

const AddContactButton: FC<{
    sidebarOpen: boolean;
}> = ({ sidebarOpen }) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className={clsx(
                        "flex flex-row gap-2 items-center border mx-4",
                        sidebarOpen ? "rounded-full 2xl:rounded-2xl" : "rounded-2xl"
                    )}
                >
                    <IoMdPersonAdd />
                    <div className={clsx(!sidebarOpen && "hidden 2xl:block")}>Add Contact</div>
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
