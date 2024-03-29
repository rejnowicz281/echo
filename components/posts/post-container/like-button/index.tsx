"use client";

import createLike from "@/actions/likes/modify/create-like";
import deleteLike from "@/actions/likes/modify/delete-like";
import SubmitButton from "@/components/general/submit-button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Post } from "@/types/posts";
import formatBigNumbers from "@/utils/general/format-big-numbers";
import { RiHeart3Fill } from "@react-icons/all-files/ri/RiHeart3Fill";
import { RiHeart3Line } from "@react-icons/all-files/ri/RiHeart3Line";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { FC } from "react";
import CreateActionHiddenInputs from "./create-action-hidden-inputs";
import LikeList from "./like-list";

type ReplyButtonProps = {
    post: Post;
};

const LikeButton: FC<ReplyButtonProps> = ({ post }) => {
    return (
        <form action={post.like ? deleteLike : createLike} className="flex flex-row items-center gap-2 text-gray-700">
            {post.like ? (
                <>
                    <input type="hidden" name="like" value={post.like} />
                    <SubmitButton
                        content={<RiHeart3Fill className="text-2xl" />}
                        loading={<VscLoading className="text-2xl animate-spin" />}
                        className="z-10 hover:text-gray-400 transition-colors"
                    />
                </>
            ) : (
                <>
                    <CreateActionHiddenInputs postId={post.id} />
                    <SubmitButton
                        content={<RiHeart3Line className="text-2xl" />}
                        loading={<VscLoading className="text-2xl animate-spin" />}
                        className="z-10 hover:text-gray-400 transition-colors"
                    />
                </>
            )}

            <Dialog>
                <DialogTrigger asChild>
                    <button type="button" className="transition-colors hover:text-gray-400 z-10">
                        {formatBigNumbers(post.like_count)}
                    </button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Likes</DialogTitle>
                        <DialogDescription>
                            {post.like_count > 0
                                ? post.like_count === 1
                                    ? `1 person liked this post.${post.like ? " (You)" : ""}`
                                    : `${post.like_count} people liked this post${post.like ? ", including you." : "."}`
                                : "No one liked this post yet."}
                        </DialogDescription>
                    </DialogHeader>
                    <LikeList postId={post.id} />
                </DialogContent>
            </Dialog>
        </form>
    );
};

export default LikeButton;
