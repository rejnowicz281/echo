import AddPostButton from "@/components/posts/add-post-button";
import { Post } from "@/types/posts";
import formatBigNumbers from "@/utils/general/format-big-numbers";
import userDisplayName from "@/utils/general/user-display-name";
import { FaRegComment } from "@react-icons/all-files/fa6/FaRegComment";
import { FC } from "react";

export type ReplyButtonProps = {
    post: Post;
};

const ReplyButton: FC<ReplyButtonProps> = ({ post }) => {
    return (
        <div className="flex flex-row items-center gap-2 text-gray-700">
            <AddPostButton
                dialogTrigger={
                    <button className="z-10 hover:text-gray-400 transition-colors">
                        <FaRegComment className="text-xl" />
                    </button>
                }
                dialogTitle="Reply to Post"
                placeholder="Post your reply"
                dialogDescription={`Reply to ${userDisplayName(post.creator)}'s post. Click Reply when you're done.`}
                parent_post={post.id}
                content="Reply"
            />
            <div>{formatBigNumbers(post.reply_count)}</div>
        </div>
    );
};

export default ReplyButton;
