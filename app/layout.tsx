import { Metadata } from "next";
import { FC } from "react";
import "./globals.css";

export const metadata: Metadata = {
    title: "echo",
    description: "all the things the other people do",
};

export type RootLayoutProps = {
    children: React.ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
