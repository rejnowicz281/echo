import { NextSearchParams } from "@/types/next-search-params";

const extractPageFromParams = (searchParams: NextSearchParams) => {
    const paramPage = Number(searchParams.page);
    return paramPage > 0 ? paramPage : 1;
};

export default extractPageFromParams;
