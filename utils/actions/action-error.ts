import actionResponse from "./action-response";

const actionError = (
    actionName: string,
    additionalData: Record<string, any> = {},
    revalidatePath: string | null = null,
    redirectPath: string | null = null
) => {
    return actionResponse(false, actionName, additionalData, revalidatePath, redirectPath);
};

export default actionError;
