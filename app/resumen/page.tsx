"use client";

import styles from "./summary.module.sass";

import ProgressBar from "@components/layout/progressBar";
import Card from "@components/card/card";
import Family from "@assets/icons/family.svg";
import { useAppContext } from "@lib/context";

export default function Summary() {
  const { user, login, election } = useAppContext();
  console.log(election);
  return (
    <section className={styles.summary}>
      <ProgressBar href={"/planes"} activeStep="2" />
      <div className={styles.content}>
        <h1 className={styles.title}>Resumen del seguro</h1>
        <Card className={styles.card}>
          <div className={styles.intro}>
            <p className={styles.userLabel}>PRECIOS CALCULADOS PARA:</p>
            <div className={styles.user}>
              <Family />
              <p>
                {user?.name} {user?.lastName}
              </p>
            </div>
          </div>
          <div className={styles.result}>
            <div>
              <p>Responsable de pago</p>
              <p>
                {login?.idType === "dni" ? "DNI" : "C.E."}: {login?.idNumber}
              </p>
              <p>Celular: {login?.cell}</p>
            </div>
            <div>
              <p>Plan elegido</p>
              <p>{election?.name}</p>
              <p>Costo del Plan: ${election?.price} al mes</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
