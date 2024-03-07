"use server";

import getDiscoveryPosts from ".";

export default async (page = 1) => getDiscoveryPosts(page);
