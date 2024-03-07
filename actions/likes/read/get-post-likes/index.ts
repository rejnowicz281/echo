import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getPostLikes = async (id: string) => {
    const actionName = "getPostLikes";

    const supabase = createClient();

    const { data: likes, error } = await supabase
        .from("posts_likes")
        .select("*, user:users(*)")
        .eq("post", id)
        .order("created_at", { ascending: false });

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { likes }, { logData: false });
};

export default getPostLikes;
