"use client";

import styles from "@styles/home.module.sass";

import Image from "next/image";
import Family from "@assets/images/family.webp";
import SelectInput from "@/components/input/selectInput";
import TextInput from "@/components/input/textinput";
import Checkbox from "@/components/input/checkbox";
import Button from "@/components/button/button";

import { useState, FormEvent } from "react";

export default function Home() {
  const [idType, setIdType] = useState<"dni" | "ce">("dni");
  const [idNumber, setIdNumber] = useState("");
  const [idNumberError, setIdNumberError] = useState("");
  const [cell, setCell] = useState("");
  const [cellError, setCellError] = useState("");
  // const [acceptTerms, setAcceptTerms] = useState(false);
  // const [sendPromo, setSendPromo] = useState(false);
  const idTypes = [
    { value: "dni", label: "DNI" },
    { value: "ce", label: "C.E." },
  ];

  const handleCellChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCell(event.target.value);
    if (cellError) {
      setCellError("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cellInput = event.currentTarget.elements.namedItem("cell") as HTMLInputElement;
    let error = "";
    if (cellInput.validity.valueMissing) {
      error = "El celular es requerido.";
    } else if (cellInput.validity.patternMismatch) {
      error = "El celular debe tener 9 dígitos numéricos.";
    }
    setCellError(error);
    if (error) {
      console.log("Formulario con errores en celular.");
      return;
    }
    console.log("Celular válido:", cell);
  };

  return (
    <section className={styles.home}>
      <Image className={styles.image} src={Family} alt="Family" priority />
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
          <TextInput
            id="cell"
            label="Celular"
            type="tel"
            value={cell}
            onChange={handleCellChange}
            required={true}
            pattern="\d{9}"
            error={cellError}
          />
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
        <Button variant="primary" className={styles.button} type="submit">
          Cotiza aquí
        </Button>
      </form>
    </section>
  );
}
