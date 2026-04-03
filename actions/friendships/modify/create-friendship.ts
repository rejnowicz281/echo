"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const createFriendship = async (formData: FormData) => {
    const actionName = "createFriendship";

    const recipient_id = formData.get("recipient_id");

    const supabase = createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        actionError(actionName, { error: "You must be logged in to create a friendship" });
        return;
    }

    const { data: friendship, error } = await supabase
        .from("friendships")
        .insert([{ requester: user.id, recipient: recipient_id }]);

    if (error) {
        actionError(actionName, { error });
        return;
    }

    actionSuccess(actionName, { friendship }, { revalidatePath: "/" });
};

export default createFriendship;
