import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function getCurrentUser() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data } = await supabase.auth.getUser();

    if (!data.user?.id) return actionError("getCurrentUser", {}, "/login");

    const user = {
        id: data.user.id,
        email: data.user.email,
        first_name: data.user.user_metadata.first_name,
        last_name: data.user.user_metadata.last_name,
        avatar_url: data.user.user_metadata.avatar_url,
    };

    return actionSuccess("getCurrentUser", { user });
}
