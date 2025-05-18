import styles from "./summary.module.sass";

import ProgressBar from "@components/layout/progressBar";
import Card from "@components/card/card";
import Family from "@assets/icons/family.svg";

export default function Summary() {
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
              <p>Rocio Miranda Díaz</p>
            </div>
          </div>
          <div className={styles.result}>
            <div>
              <p>Responsable de pago</p>
              <p>DNI: 444888888</p>
              <p>Celular: 5130216147</p>
            </div>
            <div>
              <p>Plan elegido</p>
              <p>Plan en Casa y Clínica</p>
              <p>Costo del Plan: $99 al mes</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
