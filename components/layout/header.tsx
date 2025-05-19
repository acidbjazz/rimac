import styles from "./header.module.sass";

import Logo from "@assets/icons/logo.svg";
import Phone from "@assets/icons/phone.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Logo className={styles.logo} />
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
