const timePassedSinceDate = (date: string) => {
    // get the time passed since the message was created - for example, "2 hours ago", "3 days ago", "1 week ago", "2 months ago", "1 year ago"
    const now = new Date();
    const messageDate = new Date(date);

    const timePassed = now.getTime() - messageDate.getTime();
    const secondsPassed = timePassed / 1000;
    const minutesPassed = secondsPassed / 60;
    const hoursPassed = minutesPassed / 60;
    const daysPassed = hoursPassed / 24;
    const weeksPassed = daysPassed / 7;
    const monthsPassed = daysPassed / 30;
    const yearsPassed = daysPassed / 365;

    if (secondsPassed < 60) return "Just now";
    if (minutesPassed < 60) return `${Math.floor(minutesPassed)} min ago`;
    if (hoursPassed < 24) return `${Math.floor(hoursPassed)} hours ago`;
    if (daysPassed < 7) return `${Math.floor(daysPassed)} days ago`;
    if (weeksPassed < 4) return `${Math.floor(weeksPassed)} weeks ago`;
    if (monthsPassed < 12) return `${Math.floor(monthsPassed)} months ago`;

    return `${Math.floor(yearsPassed)} yrs ago`;
};

export default timePassedSinceDate;
