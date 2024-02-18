import actionResponse from "./action-response";

const actionSuccess = (
    actionName: string,
    additionalData: Record<string, any> = {},
    revalidatePath: string | null = null,
    redirectPath: string | null = null
) => {
    return actionResponse(true, actionName, additionalData, revalidatePath, redirectPath);
};

export default actionSuccess;
