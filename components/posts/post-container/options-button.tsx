"use client";

import deletePost from "@/actions/posts/modify/delete-post";
import updatePost from "@/actions/posts/modify/update-post";
import SubmitButton from "@/components/general/submit-button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import useAuthContext from "@/providers/auth-provider";
import { Post } from "@/types/posts";
import actionSuccess from "@/utils/actions/action-success";
import { SlOptions } from "@react-icons/all-files/sl/SlOptions";
import { usePathname, useRouter } from "next/navigation";
import { FC, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogPortal,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../shadcn/ui/alert-dialog";
import { Button } from "../../shadcn/ui/button";
import PostForm from "../post-form";

type OptionsButtonProps = {
    post: Post;
};

const OptionsButton: FC<OptionsButtonProps> = ({ post }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuthContext();

    if (user.id !== post.creator.id) return null;

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const handleDelete = async (formData: FormData) => {
        await deletePost(formData);

        if (pathname === `/posts/${post.id}`) router.push(post.parent_post ? `/posts/${post.parent_post}` : "/");
        else setDeleteOpen(false);
    };

    const handleEdit = async (formData: FormData) => {
        const text = formData.get("text");
        const imageFile = formData.get("image");

        if (text === post.text && (!imageFile || (imageFile instanceof File && imageFile.size === 0))) {
            setEditOpen(false);
            return actionSuccess("updatePost");
        } else {
            const res = await updatePost(formData, post);

            if (res.success) setEditOpen(false);

            return res;
        }
    };

    return (
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="absolute top-0 right-0 z-20 hover:bg-gray-200 rounded-bl-[50%]"
                        >
                            <SlOptions />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DialogTrigger asChild>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                        </DialogTrigger>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DialogPortal>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Post</DialogTitle>
                            <DialogDescription>Update your post. Click on 'Update' when you're done.</DialogDescription>
                        </DialogHeader>
                        <PostForm initialPost={post} action={handleEdit} content="Update" placeholder="" />
                    </DialogContent>
                </DialogPortal>

                <AlertDialogPortal>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this post and all of it's
                                replies.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <form className="flex flex-col" action={handleDelete}>
                                <input type="hidden" name="id" value={post.id} />
                                <AlertDialogAction asChild>
                                    <SubmitButton content="Delete Post" loading="Deleting..." />
                                </AlertDialogAction>
                            </form>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogPortal>
            </Dialog>
        </AlertDialog>
    );
};

export default OptionsButton;
