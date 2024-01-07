"use server";

import { db } from "@/firebase";
import actionError from "@/utils/actions/actionError";
import actionSuccess from "@/utils/actions/actionSuccess";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function getPosts() {
    const actionName = "getPosts";

    try {
        const data = await getDocs(collection(db, "posts"));

        const posts = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));

        return actionSuccess(actionName, { posts });
    } catch (err) {
        return actionError(actionName, { error: err.message });
    }
}

export async function addPost(formData) {
    const actionName = "addPost";
    const title = formData.get("title");
    const content = formData.get("content");

    try {
        await addDoc(collection(db, "posts"), {
            title,
            content,
        });

        revalidatePath("/");

        return actionSuccess(actionName, { title, content });
    } catch (err) {
        return actionError(actionName, { error: err.message });
    }
}

export async function deletePost(id) {
    const actionName = "deletePost";

    try {
        const postDoc = doc(db, "posts", id);

        await deleteDoc(postDoc);

        revalidatePath("/");

        return actionSuccess(actionName, { id });
    } catch (err) {
        return actionError(actionName, { error: err.message });
    }
}
