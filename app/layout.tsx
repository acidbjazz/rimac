import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@components/header";
import Footer from "@components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seguro de Salud Flexible | RIMAC Seguros",
  description:
    "Arma un Seguro de Salud económico desde S/109 al mes. Elige las coberturas que deseas y paga solo lo que necesitas.",
};

type RootLayout = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayout) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
