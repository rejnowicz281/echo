import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import generateTimestamps from "@/utils/messages/generate-timestamps";
import { createClient } from "@/utils/supabase/server";

const getMessagesByRecipientId = async (id: string) => {
    const actionName = "getMessagesByRecipientId";

    const supabase = createClient();

    const { data: messages, error } = await supabase
        .from("messages")
        .select("*")
        .or(`recipient.eq.${id}, sender.eq.${id}`)
        .order("created_at", { ascending: true });

    if (error) return actionError(actionName, { error: error.message });

    generateTimestamps(messages);

    return actionSuccess(actionName, { messages }, { logData: false });
};

export default getMessagesByRecipientId;
