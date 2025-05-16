import Logo from "@assets/logo.svg";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <Logo />
      <div>© {year} RIMAC Seguros y Reaseguros.</div>
    </footer>
  );
}
