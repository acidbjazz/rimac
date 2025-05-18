import styles from "@styles/home.module.sass";

import Image from "next/image";
import Family from "@assets/images/family.webp";
import SelectInput from "@/components/input/selectInput";
import TextInput from "@/components/input/textinput";
import Checkbox from "@/components/input/checkbox";
import Button from "@/components/button/button";

export default function Home() {
  const idTypes = [
    { value: "dni", label: "DNI" },
    { value: "ce", label: "C.E." },
  ];
  return (
    <section className={styles.home}>
      <Image className={styles.image} src={Family} alt="Family" priority />
      <div className={styles.form}>
        <div>
          <h1>Seguro Salud Flexible</h1>
          <h2>Creado para ti y tu familia</h2>
          <p className={styles.description}>
            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100%
            online.
          </p>
        </div>
        <div className={styles.fields}>
          <SelectInput id="id" label="Nro. de documento" options={idTypes} />
          <TextInput id="cell" label="Celular" type="tel" required />
        </div>
        <div className={styles.consent}>
          <Checkbox
            label="Acepto la Política de Privacidad"
            name="privacy"
            className={styles.check}
          />
          <Checkbox
            label="Acepto la Política Comunicaciones Comerciales"
            name="commercial"
            className={styles.check}
          />
          <a href="#">Aplican Términos y Condiciones.</a>
        </div>
        <Button variant="primary" className={styles.button}>
          Cotiza aquí
        </Button>
      </div>
    </section>
  );
}
