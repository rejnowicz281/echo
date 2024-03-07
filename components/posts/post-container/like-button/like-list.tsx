"use client";

import getPostLikes from "@/actions/likes/read/get-post-likes/server";
import Loading from "@/components/general/loading";
import PresenceAvatar from "@/components/general/presence-avatar";
import { Like } from "@/types/like";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

type LikeListProps = {
    postId: string;
};

const LikeList: FC<LikeListProps> = ({ postId }) => {
    const [likes, setLikes] = useState<Like[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLikes = async () => {
            setLoading(true);

            const res = await getPostLikes(postId);

            setLoading(false);

            setLikes(res.likes);
        };

        if (postId) fetchLikes();
    }, [postId]);

    if (loading) return <Loading spinnerSize={25} />;

    return (
        <div className="flex flex-col gap-2">
            {likes.map((like) => (
                <Link
                    href={`/users/${like.user.id}`}
                    className="flex flex-row gap-3 items-center hover:bg-gray-100 p-2 transition-colors rounded-lg"
                >
                    <div className="hover:opacity-80 transition-opacity">
                        <PresenceAvatar
                            avatarSize={50}
                            markerSize={13}
                            userId={like.user.id}
                            src={like.user.avatar_url}
                        />
                    </div>

                    <div className="text-gray-500">
                        {like.user.first_name && like.user.last_name
                            ? `${like.user.first_name} ${like.user.last_name}`
                            : like.user.email}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default LikeList;
