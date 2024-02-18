import User from "@/types/user";

const userDisplayName = (user: User) => {
    if (!user.first_name && !user.last_name) return user.email;
    else return `${user.first_name} ${user.last_name}`;
};

export default userDisplayName;
