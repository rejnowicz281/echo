"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const deleteFriendship = async (formData: FormData) => {
    const actionName = "deleteFriendship";

    const supabase = createClient();

    const friendship_id = formData.get("friendship_id");

    const { data: friendship, error } = await supabase.from("friendships").delete().eq("id", friendship_id);

    if (error) return actionError(actionName, { error });

    return actionSuccess(actionName, { friendship_id }, "/");
};

export default deleteFriendship;
