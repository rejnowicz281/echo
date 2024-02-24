const formatCreateDate = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    let hours: string | number = dateObj.getHours();
    let minutes: string | number = dateObj.getMinutes();

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes} · ${month} ${day}, ${year}`;
};

export default formatCreateDate;
