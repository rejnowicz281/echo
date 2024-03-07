"use server";

import getFeedPosts from ".";

export default async (page = 1) => getFeedPosts(page);
