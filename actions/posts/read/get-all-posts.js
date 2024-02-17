import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function getAllPosts() {
    const actionName = "getAllPosts";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: posts, error } = await supabase
        .from("posts")
        .select("*, creator: users(*)")
        .order("created_at", { ascending: false });

    return actionSuccess(actionName, { posts });
}
