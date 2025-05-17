import styles from "@styles/footer.module.sass";

import Logo from "@assets/logo.svg";

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
