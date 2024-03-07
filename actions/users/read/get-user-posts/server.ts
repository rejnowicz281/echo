"use server";

import { User } from "@/types/users";
import getUserPosts from ".";

export default async (page = 1, user: User) => getUserPosts(page, user);
