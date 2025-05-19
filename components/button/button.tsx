import styles from "./button.module.sass";

interface Button {
  variant?: "primary" | "brand";
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "button";
  onClick?: () => void;
}
export default function Button({
  variant = "primary",
  children,
  className = "",
  type = "button",
  onClick,
}: Button) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
