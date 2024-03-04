"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const deleteMessage = async (formData: FormData) => {
    const actionName = "deleteMessage";

    const supabase = createClient();

    const id = formData.get("id");

    const { error } = await supabase.from("messages").delete().eq("id", id);

    if (error) return actionError(actionName, { error });

    return actionSuccess(actionName, { id }, { revalidatePath: "/users/[slug]" });
};

export default deleteMessage;
