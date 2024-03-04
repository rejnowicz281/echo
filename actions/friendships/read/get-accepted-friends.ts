import { User } from "@/types/users";
import actionError from "@/utils/actions/action-error";
import { ActionResponse } from "@/utils/actions/action-response";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export type FriendsActionResponse = ActionResponse & {
    friends?: User[];
};

const getAcceptedFriends = async (): Promise<FriendsActionResponse> => {
    const actionName = "getAcceptedFriends";

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in" });

    const [{ data: sentRequests, error: sentRequestsError }, { data: receivedRequests, error: receivedRequestsError }] =
        await Promise.all([
            supabase
                .from("friendships")
                .select("*, recipient:users!public_friendships_recipient_fkey(*)")
                .eq("requester", user.id)
                .is("accepted", true),
            supabase
                .from("friendships")
                .select("*, requester:users!public_friendships_requester_fkey(*)")
                .eq("recipient", user.id)
                .is("accepted", true),
        ]);

    if (sentRequestsError || receivedRequestsError)
        return actionError(actionName, { error: sentRequestsError || receivedRequestsError });

    const friends = (() => {
        const sentRequestsFriends = sentRequests?.map((request) => request.recipient);
        const receivedRequestsFriends = receivedRequests?.map((request) => request.requester);

        return [...(sentRequestsFriends || []), ...(receivedRequestsFriends || [])];
    })();

    return actionSuccess(actionName, { friends }, { logData: false });
};

export default getAcceptedFriends;
