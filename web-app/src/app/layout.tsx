import type { Metadata } from "next";
import './globals.css';


export const metadata: Metadata = {
  title: "HEM Parish",
  description: "Created and Inspired by Homes 'n' Codes Limited",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>Navigation Menu</header>
        {children}
        <footer>Footer Info</footer>
      </body>
    </html>
  );
}
