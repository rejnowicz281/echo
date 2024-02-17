export default function userDisplayName(user) {
    if (!user.first_name && !user.last_name) return user.email;
    else return `${user.first_name} ${user.last_name}`;
}
