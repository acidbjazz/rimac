import styles from "./progressBar.module.sass";

import IconLink from "@components/link/iconLink";
import ArrowBack from "@assets/icons/arrow-back.svg";
import Link from "next/link";

interface ProgressBar {
  href?: string;
  activeStep?: "1" | "2";
}

interface Step {
  variant?: "active" | "inactive";
  number: string;
  name: string;
}

export default function ProgressBar({ href = "#", activeStep = "1" }: ProgressBar) {
  return (
    <div className={styles.progressBar}>
      <div className={styles.desktop}>
        <div className={styles.steps}>
          <Step
            number="1"
            name="Planes y coberturas"
            variant={activeStep === "1" ? "active" : "inactive"}
          />
          <div className={styles.separator} />
          <Step number="2" name="Resumen" variant={activeStep === "2" ? "active" : "inactive"} />
        </div>
        <div className={styles.navigation}>
          <IconLink href={href} icon={ArrowBack}>
            Volver
          </IconLink>
        </div>
      </div>
      <div className={styles.mobile}>
        <div className={styles.steps}>
          <Link href={href}>
            <ArrowBack className={styles.arrow} />
          </Link>
          <p className={styles.step}>PASO {activeStep} DE 2</p>
          <div className={styles.bar}>
            <div className={styles.fill} style={{ width: activeStep === "2" ? "100%" : "50%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ variant = "inactive", number, name }: Step) {
  return (
    <div className={`${styles.step} ${styles[variant]}`}>
      <div className={styles.number}>{number}</div>
      <div className={styles.name}>{name}</div>
    </div>
  );
}
