"use client";

import useAuthContext from "@/providers/auth-provider";
import { FC } from "react";
import PostForm from "../posts/post-form";

type ConditionalPostFormProps = {
    userId: string;
};

const ConditionalPostForm: FC<ConditionalPostFormProps> = ({ userId }) => {
    const { user } = useAuthContext();

    if (user.id !== userId) return null; // If the user is not the same as the user being visited, return null

    return <PostForm />;
};

export default ConditionalPostForm;
