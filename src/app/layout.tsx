import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/interactive";
import { Footer } from "@/components/sections";
export const metadata: Metadata = {
  title: {
    default: "Still Dental — Room to feel at ease",
    template: "%s | Still Dental",
  },
  description:
    "A welcoming fictional dental practice with clear treatment information and a working local appointment booking demo.",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
