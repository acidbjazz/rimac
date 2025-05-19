"use client";

import styles from "./planCard.module.sass";

import Card from "@components/card/card";
import Button from "@/components/button/button";
import PlanHome from "@assets/icons/plan-home.svg";
import { useAppContext } from "@lib/context";
import { Plan } from "@/lib/definitions";
import { useRouter } from "next/navigation";

interface PlanCard {
  target?: "me" | "other";
  title: string;
  description: string[];
  price: number;
  className?: string;
}

export default function PlanCard({
  target = "me",
  title,
  description,
  price,
  className = "",
}: PlanCard) {
  const router = useRouter();
  const { setElection, election } = useAppContext();
  const descountPrice = Math.floor(price * 0.95);

  const handleClick = () => {
    const plan: Plan = {
      name: title,
      price: target == "me" ? price : descountPrice,
      description,
      age: 0, //this!!!!!
    };
    setElection(plan);
    router.push("/resumen");
  };

  return (
    <Card className={`${styles.planCard} ${styles[target]} ${className}`}>
      <div className={styles.header}>
        <div className={styles.intro}>
          <h2>{title}</h2>
          <p className={styles.priceLabel}>COSTO DEL PLAN</p>
          <p className={styles.before}>${price} antes</p>
          <p className={styles.price}>${target == "me" ? price : descountPrice} al mes</p>
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
      <Button variant="brand" className={styles.button} onClick={handleClick}>
        Seleccionar Plan
      </Button>
    </Card>
  );
}
