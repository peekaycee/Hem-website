import type { Metadata } from "next";
import './globals.css';
import Header from './components/Navigation';
import Footer from './components/Footer';
import { Toaster } from "react-hot-toast";
import LiveChat from "./components/liveChat";
// import PageTransitionWrapper from "./components/PageTransitionWrapper";

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
          {/* <PageTransitionWrapper> */}
            {children}
          {/* </PageTransitionWrapper> */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "'Poppins', sans-serif", 
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "12px",
              padding: "12px 16px",
              color: "#fff",
              background: "#1a1a1a",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            },
            success: {
              iconTheme: {
                primary: "hsl(180, 39%, 64%)", // green
                secondary: "#fff",
              },
              style: {
                background: "hsl(180, 100%, 28%)",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444", // red
                secondary: "#fff",
              },
              style: {
                background: "#b91c1c",
              },
            },
          }}
        />
        <LiveChat/>       
        <Footer />
      </body>
    </html>
  );
}
