import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { FC } from "react";
import "./globals.css";

export const metadata: Metadata = {
    title: "echo",
    description: "all the things the other people do",
};

type RootLayoutProps = {
    children: React.ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html className="h-full" lang="en">
            <body className="min-h-full flex flex-col">
                <NextTopLoader height={4} showSpinner={false} />
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
