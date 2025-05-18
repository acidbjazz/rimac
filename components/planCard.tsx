import styles from "@styles/planCard.module.sass";

import Card from "@components/card";
import Button from "@/components/button";
import PlanHome from "@assets/plan-home.svg";

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
