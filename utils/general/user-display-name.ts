const userDisplayName = (user: { first_name?: string; last_name?: string; email: string; [key: string]: any }) => {
    if (!user.first_name && !user.last_name) return user.email;
    else return `${user.first_name} ${user.last_name}`;
};

export default userDisplayName;
