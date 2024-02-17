"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function deletePost(formData) {
    const actionName = "deletePost";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const id = formData.get("id");

    const { data: post, error } = await supabase.from("posts").delete().eq("id", id);

    if (error) return actionError(actionName, { error });

    return actionSuccess(actionName, { id }, "/");
}
