import styles from "./card.module.sass";

interface Card {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: Card) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}
