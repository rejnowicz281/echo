"use client";

import ConditionalPostForm from "@/components/user-profile/conditional-post-form";
import PostsList from "@/components/user-profile/posts-list";
import useUserContext from "@/components/user-profile/user-provider";

const UserPage = async () => {
    const { user } = useUserContext();

    return (
        <div className="mx-auto max-w-[700px] w-full flex flex-col gap-10">
            <ConditionalPostForm userId={user.id} />
            <PostsList user={user} />
        </div>
    );
};

export default UserPage;
