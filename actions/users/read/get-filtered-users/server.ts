"use server";

import getFilteredUsers from ".";

export default async (filter: string) => getFilteredUsers(filter);
