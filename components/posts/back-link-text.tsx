import { Post } from "@/types/posts";
import userDisplayName from "@/utils/general/user-display-name";
import { FC } from "react";

export type BackLinkTextProps = {
    post: Post;
};

const BackLinkText: FC<BackLinkTextProps> = ({ post }) => {
    const parentText = () => {
        if (post.parent_post_creator) {
            if (post.parent_post_creator.id === post.creator.id) return "himself";

            return userDisplayName(post.parent_post_creator);
        } else {
            return "Parent Post";
        }
    };

    return post.parent_post ? `Replying to ${parentText()}` : "Home";
};

export default BackLinkText;
