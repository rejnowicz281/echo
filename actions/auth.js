"use server";

import { auth } from "@/firebase";
import actionError from "@/utils/actions/actionError";
import actionSuccess from "@/utils/actions/actionSuccess";
import { createUserWithEmailAndPassword, signOut as firebaseSignOut, signInWithEmailAndPassword } from "firebase/auth";

export async function signUp(formData) {
    const actionName = "signUp";

    const email = formData.get("email");
    const password = formData.get("password");

    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        return actionError(actionName, { error: error.message });
    }

    return actionSuccess(actionName, { email }, "/");
}

export async function signIn(formData) {
    const actionName = "signIn";

    const email = formData.get("email");
    const password = formData.get("password");

    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        return actionError(actionName, { error: error.message });
    }

    return actionSuccess(actionName, { email }, "/");
}

export async function signOut() {
    const actionName = "signOut";

    try {
        await firebaseSignOut(auth);
    } catch (error) {
        return actionError(actionName, { error: error.message });
    }

    return actionSuccess(actionName, {}, "/login");
}
