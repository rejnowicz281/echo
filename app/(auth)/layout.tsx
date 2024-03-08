import clsx from "clsx";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import { FC, ReactNode } from "react";

export const metadata: Metadata = {
    title: "echo",
    description: "all the things the other people do",
};

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return <div className={clsx("flex-1 flex flex-col", GeistSans.className)}>{children}</div>;
};

export default AuthLayout;
