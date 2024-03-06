import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getContacts = async () => {
    const actionName = "getContacts";

    const supabase = createClient();

    // get friends and people whom you have sent a message or received a message from

    const { data: contacts, error } = await supabase.from("user_contacts").select("*");

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { contacts }, { logData: false });
};

export default getContacts;
