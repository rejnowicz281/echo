"use client";

import useAuthContext from "@/providers/auth-provider";
import PostForm from "../posts/post-form";

const ConditionalPostForm = () => {
    const { user: currentUser } = useAuthContext();
    const { user } = useAuthContext();

    if (currentUser.id !== user.id) return null; // If the user is not the same as the user being visited, return null

    return <PostForm />;
};

export default ConditionalPostForm;
