import {ReactNode} from "react";

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html>
        <head></head>
        <body className={"m-0 p-0"}>{children}</body>
        </html>
    )
}
