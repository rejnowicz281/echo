import PresenceAvatar from "@/components/general/presence-avatar";
import { Post } from "@/types/posts";
import formatCreateDate from "@/utils/general/format-create-date";
import userDisplayName from "@/utils/general/user-display-name";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type PostContentProps = {
    post: Post;
};

const PostContent: FC<PostContentProps> = ({ post }) => {
    const creator = post.creator;
    const creatorDisplayName = userDisplayName(creator);

    return (
        <div className="word-break">
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
            <div className="py-3 flex flex-col gap-3">
                {post.text && <p className="text-xl whitespace-pre-line">{post.text}</p>}
                {post.image_url && (
                    <Image
                        src={post.image_url}
                        alt="Post Image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="rounded-lg w-full h-auto"
                    />
                )}
            </div>
            <div className="text-gray-500">{formatCreateDate(post.created_at)}</div>
        </div>
    );
};

export default PostContent;
