import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getUserReplies = async (id: string) => {
    const actionName = "getUserReplies";

    const supabase = createClient();

    const { data: replies, error } = await supabase
        .from("posts_with_details")
        .select("*, creator:users(*)")
        .not("parent_post", "is", null)
        .eq("creator", id)
        .order("created_at", { ascending: false });

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { replies });
};

export default getUserReplies;
