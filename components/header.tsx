import Link from "next/link";
import Logo from "@assets/logo.svg";

export default function Header() {
  return (
    <header>
      <Logo />
      <nav>
        <Link href="/">Home</Link>
        <Link href="/plans">Plans</Link>
        <Link href="/summary">Summary</Link>
      </nav>
      <div>¡Compra por este medio!</div>
      <a href="tel:(01) 411 6001">(01) 411 6001</a>
    </header>
  );
}
