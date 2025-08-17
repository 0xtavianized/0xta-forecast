import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@styles";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "0xta Forecast | Real-time Weather App",
    template: "%s | 0xta Forecast",
  },
  description:
    "0xta Forecast menyediakan informasi cuaca real-time berdasarkan lokasi Anda. Dapatkan prakiraan suhu, kelembapan, kecepatan angin, dan kualitas udara dengan Google Weather API & Maps API.",
  keywords: [
    "cuaca",
    "perkiraan cuaca",
    "weather app",
    "Oktavian Putra Iswandika",
    "0xtavianized",
    "oktavianized",
    "0xta Forecast",
  ],
  authors: [{ name: "Oktavian Putra Iswandika", url: "https://0xta.my.id" }],
  creator: "Oktavian Putra Iswandika",
  publisher: "0xta Forecast",

  openGraph: {
    title: "0xta Forecast | Real-time Weather App",
    description:
      "Aplikasi prakiraan cuaca real-time dengan Google Weather API & Maps API. Dapatkan data suhu, kelembapan, angin, dan kualitas udara.",
    url: "https://forecast.0xta.my.id",
    siteName: "0xta Forecast",
    images: [
      {
        url: "https://forecast.0xta.my.id/og-image.png",
        width: 1200,
        height: 630,
        alt: "0xta Forecast - Real-time Weather App",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "0xta Forecast | Real-time Weather App",
    description:
      "Cek cuaca real-time berdasarkan lokasi Anda. Powered by Google Weather API & Maps API.",
    creator: "@0xtavianized",
    images: ["https://forecast.0xta.my.id/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  metadataBase: new URL("https://forecast.0xta.my.id"),
  alternates: {
    canonical: "https://forecast.0xta.my.id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased`}
      >
        <main className="flex-grow container mx-auto p-4">{children}</main>

        <footer className="text-center text-sm text-gray-400 p-4">
          &copy; {new Date().getFullYear()}{" "}
          <Link href="https://0xta.my.id" className="text-blue-500">
            Oktavian Putra Iswandika
          </Link>
          .
        </footer>
      </body>
    </html>
  );
}
