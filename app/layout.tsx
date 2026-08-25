import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Lee Ryan Garcia | Antigravity IDE Portfolio",
  description:
    "Senior Full-Stack & AI Systems Engineer Portfolio styled after the Google Antigravity IDE with interactive terminal, Gemini 3.7 copilot, and live code preview.",
  openGraph: {
    title: "Lee Ryan Garcia | Antigravity IDE Portfolio",
    description:
      "Senior Full-Stack & AI Systems Engineer Portfolio styled after the Google Antigravity IDE.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lee Ryan Garcia | Antigravity IDE Portfolio",
    description:
      "Senior Full-Stack & AI Systems Engineer Portfolio styled after the Google Antigravity IDE.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body
        className="bg-[#181818] text-[#cccccc] antialiased overflow-hidden selection:bg-sky-500/30 selection:text-white"
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
