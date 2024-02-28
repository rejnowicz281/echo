const formatBigNumbers = (num: number): string => {
    if (num < 1000) return num.toString(); // if smaller than 1k
    if (num < 1000000) return `${(num / 1000).toFixed(1)}k`; // if bigger than 1k

    return `${(num / 1000000).toFixed(1)}m`; // if bigger than 1m
};

export default formatBigNumbers;
