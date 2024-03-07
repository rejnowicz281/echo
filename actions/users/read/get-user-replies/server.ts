"use server";

import getUserReplies from ".";

export default async (page = 1, id: string) => getUserReplies(page, id);
