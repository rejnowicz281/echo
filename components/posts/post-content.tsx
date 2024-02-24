import { Post } from "@/types/posts";
import formatCreateDate from "@/utils/general/format-create-date";
import userDisplayName from "@/utils/general/user-display-name";
import Link from "next/link";
import { FC } from "react";
import PresenceAvatar from "../general/presence-avatar";
import OptionsButton from "./options-button";

export type PostContentProps = {
    post: Post;
};

const PostContent: FC<PostContentProps> = ({ post }) => {
    const creator = post.creator;
    const creatorDisplayName = userDisplayName(creator);

    return (
        <div className="word-break">
            <div className="flex flex-row items-center justify-between gap-3">
                <div className="flex flex-row gap-3 items-center">
                    <Link href={`/users/${creator.id}`} className="z-10 hover:opacity-80 transition-opacity">
                        <PresenceAvatar avatarSize={50} markerSize={13} userId={creator.id} src={creator.avatar_url} />
                    </Link>
                    <div className="flex flex-col justify-center">
                        <Link href={`/users/${creator.id}`} className="z-10 hover:underline">
                            {creatorDisplayName}
                        </Link>
                        {creator.email !== creatorDisplayName && (
                            <Link href={`/users/${creator.id}`} className="z-10 text-gray-500 hover:underline">
                                {creator.email}
                            </Link>
                        )}
                    </div>
                </div>

                <OptionsButton post={post} />
            </div>
            <div className="py-3 flex flex-col gap-3">
                {post.text && <p className="text-xl">{post.text}</p>}
                {post.image_url && <img src={post.image_url} alt="post image" className="w-full rounded-lg h-auto" />}
            </div>
            <div className="text-gray-500">{formatCreateDate(post.created_at)}</div>
        </div>
    );
};

export default PostContent;
