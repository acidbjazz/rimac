import styles from "@styles/progressBar.module.sass";

import IconLink from "@components/iconLink";
import ArrowBack from "@assets/arrow-back.svg";

interface Step {
  number: string;
  name: string;
}

export default function ProgressBar() {
  return (
    <div className={styles.progressBar}>
      <div className={styles.steps}>
        <Step number="1" name="Cotización" />
        <Step number="2" name="Resumen" />
      </div>
      <div className={styles.navigation}>
        <IconLink href="/" icon={ArrowBack}>
          Volver
        </IconLink>
      </div>
    </div>
  );
}

function Step({ number, name }: Step) {
  return (
    <div className={styles.step}>
      <div className={styles.number}>{number}</div>
      <div className={styles.name}>{name}</div>
    </div>
  );
}
