import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarDock from "@/components/custom/NavbarDock";
import { ThemeProvider } from "@/components/custom/theme-provider"
import {ClerkProvider} from "@clerk/nextjs"
import SideOptions from "@/components/custom/SideOptions";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mercury | Automating bussinesses email needs",
  description: "Automating bussinesses email needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ClerkProvider>
      <html lang="en" suppressHydrationWarning >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased relative h-screen`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <SideOptions/>
              
              {/* <div className="absolute inset-0 -z-90 size-full bg-background  dark:bg-[radial-gradient(#2b2b2b_1px,transparent_1px)] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px]"> */}
                <div className="w-full min-h-screen flex justify-center">
                  {children}
                  <Toaster/>
                </div>
              {/* </div> */}
            </ThemeProvider>
          <NavbarDock/>
        </body>
      </html>
     </ClerkProvider>

  );
}
