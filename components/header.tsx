import styles from "@styles/header.module.sass";

import Link from "next/link";
import Logo from "@assets/logo.svg";
import Phone from "@assets/phone.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Logo className={styles.logo} />
        <nav>
          <Link href="/">Home</Link>
          <Link href="/planes">Plans</Link>
          <Link href="/resumen">Summary</Link>
        </nav>
        <div className={styles.contact}>
          <div className={styles.buy}>¡Compra por este medio!</div>
          <a className={styles.phone} href="tel:(01) 411 6001">
            <Phone />
            <span>(01) 411 6001</span>
          </a>
        </div>
      </div>
    </header>
  );
}
