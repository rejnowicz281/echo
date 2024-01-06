import "./globals.css";

export const metadata = {
    title: "echo",
    description: "all the things the other people do",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
