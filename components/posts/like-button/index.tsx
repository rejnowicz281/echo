"use client";

import createLike from "@/actions/likes/modify/create-like";
import deleteLike from "@/actions/likes/modify/delete-like";
import SubmitButton from "@/components/general/submit-button";
import { Post } from "@/types/posts";
import formatBigNumbers from "@/utils/general/format-big-numbers";
import { FC } from "react";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";
import CreateActionHiddenInputs from "./create-action-hidden-inputs";

export type ReplyButtonProps = {
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

            <div>{formatBigNumbers(post.like_count)}</div>
        </form>
    );
};

export default LikeButton;
