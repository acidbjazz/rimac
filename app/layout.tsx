import "@styles/reset.css";
import "@styles/ds.sass";
import styles from "@styles/rootLayout.module.sass";

import type { Metadata } from "next";
import { sans } from "@lib/fonts";

import Header from "@components/layout/header";
import Footer from "@components/layout/footer";

import { AppProvider } from "@/lib/context";

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
      <body className={`${styles.body} ${sans.variable} `}>
        <AppProvider>
          <div className={styles.layout}>
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
