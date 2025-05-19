"use client";

import styles from "./plans.module.sass";

import ProgressBar from "@components/layout/progressBar";
import TargetCard from "@components/card/targetCard";
import PlanCard from "@components/card/planCard";
import PlanMe from "@assets/icons/plan-me.svg";
import PlanSomebody from "@assets/icons/plan-somebody.svg";
import { useAppContext } from "@lib/context";
import { getUser, getPlans } from "@/lib/api";
import { useEffect, useState } from "react";
import { useAgeFromBirthday } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export default function Plans() {
  const { user, setUser, plan, setPlan, logged } = useAppContext();
  const [target, setTarget] = useState<"me" | "other">("me");
  const [firstTargetClicked, setFirstTargetClicked] = useState<boolean>(false);
  const router = useRouter();

  const edad = useAgeFromBirthday(user?.birthDay);

  useEffect(() => {
    if (!logged) {
      router.replace("/");
    }
  }, [logged, router]);

  if (!logged) {
    return null;
  }

  useEffect(() => {
    getUser().then((userData) => {
      setUser(userData);
    });
  }, [setUser]);

  useEffect(() => {
    getPlans().then((plansData) => {
      setPlan(plansData);
    });
  }, [setPlan]);

  const handleTarget = (target: "me" | "other") => {
    if (!firstTargetClicked) {
      setFirstTargetClicked(true);
    }
    setTarget(target);
  };

  return (
    <section className={styles.plansPage}>
      <ProgressBar href={"/"} activeStep="1" />
      <div className={styles.form}>
        <div className={styles.intro}>
          <h1 className={styles.title}>{user?.name || "Hola"}, ¿Para quién deseas cotizar?</h1>
          <p className={styles.subtitle}>
            Selecciona la opción que se ajuste más a tus necesidades.
          </p>
        </div>
        <div className={styles.targets}>
          <TargetCard
            title="Para mi"
            description="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
            value=""
            icon={PlanMe}
            onClick={() => handleTarget("me")}
          />
          <TargetCard
            title="Para alguien más"
            description="Realiza una cotización para uno de tus familiares o cualquier persona."
            value="somebody"
            icon={PlanSomebody}
            onClick={() => handleTarget("other")}
          />
        </div>
        {firstTargetClicked && (
          <div className={styles.plans}>
            {plan
              ?.filter((item) => edad !== null && item.age >= edad)
              .map((item) => (
                <PlanCard
                  key={item.name}
                  title={item.name}
                  description={item.description}
                  price={item.price}
                  target={target}
                />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
