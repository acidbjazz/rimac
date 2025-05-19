import styles from "./targetCard.module.sass";

import Card from "@components/card/card";

interface TargetCard {
  title: string;
  description: string;
  value: string;
  icon?: React.ElementType;
  className?: string;
  onClick?: () => void;
}

export default function targetCard({
  title,
  description,
  value,
  className = "",
  icon: Icon,
  onClick,
}: TargetCard) {
  return (
    <label className={`${styles.targetCard} ${className}`}>
      <input type="radio" name="opcion" value={value} onClick={onClick} />
      <Card className={styles.card}>
        <div className={styles.check}></div>
        <div className={styles.intro}>
          {Icon && <Icon />}
          <h2>{title}</h2>
        </div>
        <p>{description}</p>
      </Card>
    </label>
  );
}
