"use server";

import getPostReplies from ".";

export default async (page = 1, id: string) => getPostReplies(page, id);
