import type { Metadata } from "next";
import './globals.css';
import Header from './components/Navigation';
import Footer from './components/Footer';
import { Toaster } from "react-hot-toast";
import LiveChat from "./components/liveChat";

export const metadata: Metadata = {
  title: "HEM Parish",
  description: "Created and Inspired by Homes 'n' Codes Limited",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {;
  return (
    <html lang="en">
      <body>
        <Header />
         <Toaster position="top-right" />
        {children}
        <LiveChat/>       
        <Footer />
      </body>
    </html>
  );
}
