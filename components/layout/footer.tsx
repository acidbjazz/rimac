import styles from "./footer.module.sass";

import Logo from "@assets/icons/logo.svg";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Logo className={styles.logo} />
        <div>© {year} RIMAC Seguros y Reaseguros.</div>
      </div>
    </footer>
  );
}
