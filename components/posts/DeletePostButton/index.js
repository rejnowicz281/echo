"use client";

import { deletePost } from "@/actions/posts";
import AsyncButton from "@/components/general/AsyncButton";

export default function DeletePostButton({ id }) {
    return <AsyncButton onClick={() => deletePost(id)} loading="Deleting..." content="Delete Post" />;
}
