import styles from "@styles/plans.module.sass";

import ProgressBar from "@components/progressBar";
import UserCard from "@components/userCard";
import PlanCard from "@components/planCard";

import PlanMe from "@assets/plan-me.svg";
import PlanSomebody from "@assets/plan-somebody.svg";

const data = {
  list: [
    {
      name: "Plan en Casa",
      price: 39,
      description: [
        "Médico general a domicilio por S/20 y medicinas cubiertas al 100%.",
        "Videoconsulta y orientación telefónica  al 100% en medicina general + pediatría.",
        "Indemnización de S/300 en caso de hospitalización por más de un día.",
      ],
      age: 60,
    },
    {
      name: "Plan en Casa y Clínica",
      price: 99,
      description: [
        "Consultas en clínica para cualquier especialidad.",
        "Medicinas y exámenes derivados cubiertos al 80%.",
        "Atención médica en más de 200 clínicas del país.",
      ],
      age: 70,
    },
    {
      name: "Plan en Casa + Bienestar",
      price: 70,
      description: [
        "Videoconsulta con especialistas de psicología y nutrición.",
        "Acceso a videos y recursos sobre bienestar.",
        "Incluye todos los beneficios del Plan en Casa.",
      ],
      age: 25,
    },
    {
      name: "Plan en Casa + Chequeo ",
      price: 49,
      description: [
        "Un Chequeo preventivo general de manera presencial o virtual.",
        "Acceso a Vacunas en el Programa del MINSA en centros privados.",
        "Incluye todos los beneficios del Plan en Casa.",
      ],
      age: 90,
    },
    {
      name: "Plan en Casa + Fitness",
      price: 45,
      description: [
        "Descuentos en más de 50 locales de gimnasio.",
        "Beneficios exclusivos en alimentos nutricionales y complementos.",
        "Incluye todos los beneficios del Plan en Casa.",
      ],
      age: 30,
    },
  ],
};

export default function Plans() {
  return (
    <section className={styles.plansPage}>
      <ProgressBar />
      <div className={styles.form}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Rocío ¿Para quién deseas cotizar?</h1>
          <p className={styles.subtitle}>
            Selecciona la opción que se ajuste más a tus necesidades.
          </p>
        </div>
        <div className={styles.users}>
          <UserCard
            title="Para mi"
            description="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
            value=""
            icon={PlanMe}
          />
          <UserCard
            title="Para alguien más"
            description="Realiza una cotización para uno de tus familiares o cualquier persona."
            value="somebody"
            icon={PlanSomebody}
          />
        </div>
        <div className={styles.plans}>
          {data.list.map((plan) => (
            <PlanCard
              key={plan.name}
              title={plan.name}
              description={plan.description}
              price={plan.price}
              // age={plan.age}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
