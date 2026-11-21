import type { Metadata } from "next";
import "../styles/index.css";
import { Providers } from "./providers";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { MobileNav } from "./components/MobileNav";

export const metadata: Metadata = {
  title: "BRACE Optics",
  description: "Your trusted BRACE Optics store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-20 pb-20 md:pb-0">
              {children}
            </main>
            <Footer />
            <MobileNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}
