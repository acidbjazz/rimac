import styles from "./userCard.module.sass";

import Card from "@components/card/card";

interface UserCard {
  title: string;
  description: string;
  value: string;
  icon?: React.ElementType;
  className?: string;
}

export default function userCard({
  title,
  description,
  value,
  className = "",
  icon: Icon,
}: UserCard) {
  return (
    <label className={`${styles.userCard} ${className}`}>
      <input type="radio" name="opcion" value={value}></input>
      <Card className={styles.card}>
        <div className={styles.check}></div>
        {Icon && <Icon />}
        <h2>{title}</h2>
        <p>{description}</p>
      </Card>
    </label>
  );
}
