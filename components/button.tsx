import styles from "@styles/button.module.sass";

interface Button {
  variant?: "primary" | "brand";
  children: React.ReactNode;
  className?: string;
}
export default function Button({ variant = "primary", children, className = "" }: Button) {
  return <button className={`${styles.button} ${styles[variant]} ${className}`}>{children}</button>;
}
