import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";

export const metadata = {
  title: "Christian Miller — Classical Photography in Miami",
  description:
    "Christian Miller is a photographer devoted to classical and beautiful things. Portraits, pregnancy, editorial, and graduation work based in Miami.",
  openGraph: {
    title: "Christian Miller — Classical Photography in Miami",
    description:
      "Portraits, pregnancy, editorial, and graduation work — devoted to classical and beautiful things.",
    url: "https://www.christianmillerfilm.com",
    siteName: "Christian Miller",
    type: "website",
    images: [
      {
        url: "https://www.christianmillerfilm.com/images/bryan-and-amy/bryan-and-amy-01.jpg",
        width: 1200,
        height: 1500,
        alt: "Christian Miller — Classical Photography in Miami",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Miller — Classical Photography in Miami",
    description: "Devoted to classical and beautiful things.",
    images: [
      "https://www.christianmillerfilm.com/images/bryan-and-amy/bryan-and-amy-01.jpg",
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Serif pairing: Cormorant Garamond for display, EB Garamond for body */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen text-ink antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
        <GrainOverlay />
      </body>
    </html>
  );
}
