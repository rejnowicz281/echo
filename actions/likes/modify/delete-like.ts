"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const deleteLike = async (formData: FormData) => {
    const actionName = "deleteLike";

    const supabase = createClient();

    const like = formData.get("like");

    const { error } = await supabase.from("posts_likes").delete().eq("id", like);

    if (error) return actionError(actionName, { error });

    return actionSuccess(actionName, { like }, { revalidatePath: "/" });
};

export default deleteLike;
