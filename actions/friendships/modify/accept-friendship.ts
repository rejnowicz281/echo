"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const acceptFriendship = async (formData: FormData) => {
    const actionName = "acceptFriendship";

    const friendship_id = formData.get("friendship_id");

    const supabase = createClient();

    const { data: friendship, error } = await supabase
        .from("friendships")
        .update({ accepted: true })
        .eq("id", friendship_id);

    if (error) return actionError(actionName, { error });

    return actionSuccess(actionName, { friendship }, "/");
};

export default acceptFriendship;
