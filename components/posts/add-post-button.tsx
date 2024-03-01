"use client";

import addPost from "@/actions/posts/modify/add-post";
import { Button } from "@/components/shadcn/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { FC, useState } from "react";
import { IoMdCreate } from "react-icons/io";
import PostForm from "./post-form";

export type AddPostbuttonProps = {
    dialogTitle?: string;
    dialogDescription?: string;
    dialogTrigger?: React.ReactNode;
    content?: string;
    placeholder?: string;
    parent_post?: string;
};

const AddPostButton: FC<AddPostbuttonProps> = ({
    dialogTitle = "Add Post",
    dialogDescription = "Create a post. Click Post when you're done.",
    content = "Post",
    placeholder = "What's going on?",
    dialogTrigger = (
        <Button variant="ghost" className="rounded-2xl flex flex-row items-center border gap-2">
            <IoMdCreate />
            Add Post
        </Button>
    ),
    parent_post,
}) => {
    const [open, setOpen] = useState(false);

    async function handleAction(formData: FormData) {
        const res = await addPost(formData);

        if (res.success) setOpen(false);

        return res;
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild={dialogTrigger ? true : false}>
                {dialogTrigger ? dialogTrigger : "Add Post"}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{dialogDescription}</DialogDescription>
                </DialogHeader>
                <PostForm action={handleAction} parent_post={parent_post} content={content} placeholder={placeholder} />
            </DialogContent>
        </Dialog>
    );
};

export default AddPostButton;
