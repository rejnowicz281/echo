import actionResponse from "./action-response";

export default function actionSuccess(actionName, additionalData = {}, revalidatePath = null, redirectPath = null) {
    return actionResponse(true, actionName, additionalData, revalidatePath, redirectPath);
}
