"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const sendMessage = async (formData: FormData) => {
    const actionName = "sendMessage";

    const sender = formData.get("sender");
    const recipient = formData.get("recipient");

    const textFormData = formData.get("text");

    const text = typeof textFormData === "string" ? textFormData : null;

    if (!recipient) return actionError(actionName, { error: "Recipient is required" });
    if (!text) return actionError(actionName, { error: "Text is required" });

    const supabase = createClient();

    const { error } = await supabase.from("messages").insert([{ sender, recipient, text }]);

    if (error) return actionError(actionName, { error });

    return actionSuccess(actionName, { recipient, text }, { revalidatePath: "/" });
};

export default sendMessage;
