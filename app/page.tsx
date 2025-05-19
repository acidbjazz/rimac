"use client";

import styles from "@styles/home.module.sass";
import Image from "next/image";
import Family from "@assets/images/family.webp";
import TextInput from "@/components/input/textinput";
import Checkbox from "@/components/input/checkbox";
import Button from "@/components/button/button";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@lib/context";
import { Login } from "@/lib/definitions";

export default function Home() {
  const router = useRouter();
  const { setLogged, setLogin } = useAppContext();

  const [idType, setIdType] = useState<"dni" | "ce">("dni");
  const [idNumber, setIdNumber] = useState("12345678");
  const [idNumberError, setIdNumberError] = useState("");
  const [cell, setCell] = useState("987654321");
  const [cellError, setCellError] = useState("");
  const [privacy, setPrivacy] = useState(true);
  const [privacyError, setPrivacyError] = useState("");
  const [commercial, setCommercial] = useState(false);
  const [commercialError, setCommercialError] = useState("");

  const idTypeOptions = [
    { value: "dni", label: "DNI" },
    { value: "ce", label: "C.E." },
  ];

  const handleIdTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newIdType = event.target.value as "dni" | "ce";
    setIdType(newIdType);
    setIdNumber("");
    setIdNumberError("");
  };

  const handleIdNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdNumber(event.target.value);
    if (idNumberError) {
      setIdNumberError("");
    }
  };

  const handleCellChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCell(event.target.value);
    if (cellError) {
      setCellError("");
    }
  };

  const handlePrivacyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacy(event.target.checked);
    if (privacyError) {
      setPrivacyError("");
    }
  };

  const handleCommercialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommercial(event.target.checked);
    if (commercialError) {
      setCommercialError("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let formIsValid = true;

    const idNumberInputEl = event.currentTarget.elements.namedItem("idNumber") as HTMLInputElement;
    let currentIdNumberError = "";
    if (idNumberInputEl.validity.valueMissing) {
      currentIdNumberError = "El número de documento es requerido.";
    } else if (idNumberInputEl.validity.patternMismatch) {
      currentIdNumberError =
        idType === "dni"
          ? "El DNI debe tener 8 dígitos numéricos."
          : "El C.E. debe tener 11 caracteres alfanuméricos.";
    }
    setIdNumberError(currentIdNumberError);
    if (currentIdNumberError) formIsValid = false;

    const cellInputEl = event.currentTarget.elements.namedItem("cell") as HTMLInputElement;
    let currentCellError = "";
    if (cellInputEl.validity.valueMissing) {
      currentCellError = "El celular es requerido.";
    } else if (cellInputEl.validity.patternMismatch) {
      currentCellError = "El celular debe tener 9 dígitos numéricos.";
    }
    setCellError(currentCellError);
    if (currentCellError) formIsValid = false;

    let currentPrivacyError = "";
    if (!privacy) {
      currentPrivacyError = "Debe aceptar la Política de Privacidad.";
    }
    setPrivacyError(currentPrivacyError);
    if (currentPrivacyError) formIsValid = false;

    let currentCommercialError = "";
    if (!commercial) {
      currentCommercialError = "Debe aceptar la Política de Comunicaciones Comerciales.";
    }
    setCommercialError(currentCommercialError);
    if (currentCommercialError) formIsValid = false;

    if (formIsValid) {
      const LoginData: Login = {
        idType,
        idNumber,
        cell,
        privacy,
        commercial,
      };
      setLogin(LoginData);
      setLogged(true);

      console.log("Formulario Válido. Datos:", LoginData);
      router.push("/planes");
    }
  };

  return (
    <section className={styles.home}>
      <Image className={styles.image} src={Family} alt="Family" priority />
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.intro}>
          <div className={styles.columns}>
            <div>
              <h1>Seguro Salud Flexible</h1>
              <h2>Creado para ti y tu familia</h2>
            </div>
            <Image className={styles.imageMobile} src={Family} alt="Family" priority />
          </div>
          <p className={styles.description}>
            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100%
            online.
          </p>
        </div>
        <div className={styles.fields}>
          <div className={styles.selectInput}>
            <label htmlFor="idType">Nro. de Documento</label>
            <div>
              <select id="idType" name="idType" value={idType} onChange={handleIdTypeChange}>
                {idTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={idNumber}
                onChange={handleIdNumberChange}
                required
                pattern={idType === "dni" ? "\\d{8}" : "[a-zA-Z0-9]{11}"}
                maxLength={idType === "dni" ? 8 : 11}
              />
            </div>
            {idNumberError && <p className={styles.error}>{idNumberError}</p>}
          </div>
          <TextInput
            id="cell"
            name="cell"
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
            id="privacy"
            name="privacy"
            label="Acepto la Política de Privacidad"
            className={styles.check}
            checked={privacy}
            onChange={handlePrivacyChange}
            error={privacyError}
          />
          <Checkbox
            id="commercial"
            name="commercial"
            label="Acepto la Política Comunicaciones Comerciales"
            className={styles.check}
            checked={commercial}
            onChange={handleCommercialChange}
            error={commercialError}
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
