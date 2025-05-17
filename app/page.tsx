import styles from "@styles/home.module.sass";

import Image from "next/image";
import Family from "@assets/family.webp";

export default function Home() {
  return (
    <section className={styles.home}>
      <Image className={styles.image} src={Family} alt="Family" priority />
      <form>
        <h1>Seguro Salud Flexible</h1>
        <h2>Creado para ti y tu familia</h2>
        <p className={styles.description}>
          Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
        </p>
        <div className={styles.doc}>
          <label>Nro. de documento</label>
          <div>
            <select>
              <option>DNI</option>
              <option>C.E.</option>
            </select>
            <input type="text" />
          </div>
        </div>
        <div className={styles.cell}>
          <label>Celular</label>
          <input type="text" />
        </div>
        <div className={styles.check}>
          <label>
            <input type="checkbox" />
            <span>Acepto lo Política de Privacidad</span>
          </label>
        </div>
        <div className={styles.check}>
          <label>
            <input type="checkbox" />
            <span>Acepto la Política Comunicaciones Comerciales</span>
          </label>
        </div>
        <a href="#">Aplican Términos y Condiciones.</a>
        <button type="submit">Cotiza aquí</button>
      </form>
    </section>
  );
}
