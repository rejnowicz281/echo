import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import generateTimestamps from "@/utils/messages/generate-timestamps";
import { createClient } from "@/utils/supabase/server";

const getChatterMessages = async (id: string) => {
    const actionName = "getChatterMessages";

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in" });

    const { data: messages, error } = await supabase
        .from("messages")
        .select("*")
        .or(`and(sender.eq.${user.id}, recipient.eq.${id}), and(sender.eq.${id}, recipient.eq.${user.id})`)
        .order("created_at", { ascending: true });

    if (error) return actionError(actionName, { error: error.message });

    generateTimestamps(messages);

    return actionSuccess(actionName, { messages }, { logData: false });
};

export default getChatterMessages;
