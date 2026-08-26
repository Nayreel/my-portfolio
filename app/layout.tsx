import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Geist, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#121316",
};

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lee Ryan Garcia | Developer IDE Portfolio",
  description:
    "Senior Full-Stack & AI Systems Engineer Portfolio styled as an interactive IDE with terminal emulator, Gemini 3.7 copilot, and live preview.",
  openGraph: {
    title: "Lee Ryan Garcia | Developer IDE Portfolio",
    description:
      "Senior Full-Stack & AI Systems Engineer Portfolio styled as an interactive IDE.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lee Ryan Garcia | Developer IDE Portfolio",
    description:
      "Senior Full-Stack & AI Systems Engineer Portfolio styled as an interactive IDE.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "dark",
        "font-sans",
        geistSans.variable,
        jetbrainsMono.variable,
      )}
    >
      <body
        className="bg-[#181818] text-[#cccccc] antialiased overflow-hidden selection:bg-sky-500/30 selection:text-white font-sans text-[13px]"
        suppressHydrationWarning
      >
        <TooltipProvider delay={200}>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
