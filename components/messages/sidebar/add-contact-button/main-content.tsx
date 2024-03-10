"use client";

import getFilteredUsers from "@/actions/users/read/get-filtered-users/server";
import PresenceAvatar from "@/components/general/presence-avatar";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import useDebounce from "@/hooks/use-debounce";
import { User } from "@/types/users";
import userDisplayName from "@/utils/general/user-display-name";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

type MainContentProps = {
    closeDialog: () => void;
};

const MainContent: FC<MainContentProps> = ({ closeDialog }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const populateUsers = async () => {
            if (searchQuery.length === 0) {
                setUsers([]);
                return;
            }

            setLoading(true);
            const { users } = await getFilteredUsers(debouncedSearch.trim());
            setLoading(false);

            if (users) setUsers(users);
        };

        populateUsers();
    }, [debouncedSearch]);

    return (
        <div className="flex flex-col gap-5">
            <input
                type="text"
                placeholder="Search for a user..."
                className="border border-gray-200 rounded-2xl p-3 outline-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex flex-col gap-5">
                {loading ? (
                    <div className="flex items-center gap-2">
                        <Skeleton className="rounded-full w-[50px] h-[50px]" />
                        <Skeleton className="rounded-lg h-[35px] w-[100px]" />
                    </div>
                ) : (
                    users.map((user) => (
                        <Link
                            onClick={closeDialog}
                            href={`/messages/${user.id}`}
                            className="group flex items-center gap-2 group"
                        >
                            <PresenceAvatar userId={user.id} avatarSize={50} src={user.avatar_url} />
                            <div className="rounded-lg p-2 transition-colors group-hover:bg-gray-200">
                                {userDisplayName(user)}
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default MainContent;
