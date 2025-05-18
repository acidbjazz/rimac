import styles from "./planCard.module.sass";

import Card from "@components/card/card";
import Button from "@/components/button/button";
import PlanHome from "@assets/icons/plan-home.svg";

interface PlanCard {
  title: string;
  description: string[];
  price: number;
  className?: string;
}

export default function planCard({ title, description, price, className = "" }: PlanCard) {
  return (
    <Card className={`${styles.planCard} ${className}`}>
      <div className={styles.header}>
        <div className={styles.intro}>
          <h2>{title}</h2>
          <p className={styles.priceLabel}>COSTO DEL PLAN</p>
          <p className={styles.price}>${price} al mes</p>
        </div>
        <PlanHome className={styles.icon} />
      </div>
      {description && (
        <ul>
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      <Button variant="brand" className={styles.button}>
        Seleccionar Plan
      </Button>
    </Card>
  );
}
