import styles from "./button.module.sass";

interface Button {
  variant?: "primary" | "brand";
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "button";
}
export default function Button({
  variant = "primary",
  children,
  className = "",
  type = "button",
}: Button) {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`} type={type}>
      {children}
    </button>
  );
}
