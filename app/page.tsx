"use client";

import styles from "@styles/home.module.sass";
import Image from "next/image";
import Family from "@assets/images/family.webp";
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
  const [privacy, setPrivacy] = useState(false);
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
      const formData = {
        idType,
        idNumber,
        cell,
        privacy,
        commercial,
      };
      console.log("Formulario Válido. Datos:", formData);
      console.log("Simulando navegación a /planes con los datos...");
    } else {
      console.log("Formulario con errores. Por favor, revise los campos.");
    }
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

// "use client";

// import styles from "@styles/home.module.sass";

// import Image from "next/image";
// import Family from "@assets/images/family.webp";
// import SelectInput from "@/components/input/selectInput";
// import TextInput from "@/components/input/textinput";
// import Checkbox from "@/components/input/checkbox";
// import Button from "@/components/button/button";

// import { useState, FormEvent } from "react";

// export default function Home() {
//   const [idType, setIdType] = useState<"dni" | "ce">("dni");
//   const [idNumber, setIdNumber] = useState("");
//   const [idNumberError, setIdNumberError] = useState("");
//   const [cell, setCell] = useState("");
//   const [cellError, setCellError] = useState("");
//   // const [acceptTerms, setAcceptTerms] = useState(false);
//   // const [sendPromo, setSendPromo] = useState(false);
//   const idTypes = [
//     { value: "dni", label: "DNI" },
//     { value: "ce", label: "C.E." },
//   ];

//   // --- Manejador de cambio para Tipo de Documento (idType) ---
//   const handleIdTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const newIdType = event.target.value as "dni" | "ce";
//     setIdType(newIdType);
//     // Importante: Limpiar idNumber y su error cuando idType cambia
//     setIdNumber("");
//     setIdNumberError("");
//   };

//   // --- Manejador de cambio para Número de Documento (idNumber) ---
//   const handleIdNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setIdNumber(event.target.value);
//     if (idNumberError) {
//       setIdNumberError(""); // Limpiar error al modificar
//     }
//   };

//   const handleCellChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setCell(event.target.value);
//     if (cellError) {
//       setCellError("");
//     }
//   };

//   // --- Manejador de envío del formulario (se actualizará para incluir todas las validaciones) ---
//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     let formHasErrors = false; // Para rastrear si hay algún error en el formulario

//     // Validación para 'cell' (como la tenías)
//     const cellInput = event.currentTarget.elements.namedItem("cell") as HTMLInputElement;
//     let currentCellError = "";
//     if (cellInput.validity.valueMissing) {
//       currentCellError = "El celular es requerido.";
//     } else if (cellInput.validity.patternMismatch) {
//       currentCellError = "El celular debe tener 9 dígitos numéricos.";
//     }
//     setCellError(currentCellError);
//     if (currentCellError) formHasErrors = true;

//     // Aquí añadiremos validación para idNumber (y idType si fuera necesario)

//     if (formHasErrors) {
//       console.log("Formulario con errores.");
//       return;
//     }

//     console.log("Formulario parcialmente válido. Datos:", { idType, idNumber, cell });
//     // Lógica para "pasar a la siguiente página" si todo es válido
//   };

//   return (
//     <section className={styles.home}>
//       <Image className={styles.image} src={Family} alt="Family" priority />
//       <form className={styles.form} onSubmit={handleSubmit} noValidate>
//         <div>
//           <h1>Seguro Salud Flexible</h1>
//           <h2>Creado para ti y tu familia</h2>
//           <p className={styles.description}>
//             Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100%
//             online.
//           </p>
//         </div>
//         <div className={styles.fields}>
//           <SelectInput id="id" label="Nro. de documento" options={idTypes} />
//           <TextInput
//             id="cell"
//             label="Celular"
//             type="tel"
//             value={cell}
//             onChange={handleCellChange}
//             required={true}
//             pattern="\d{9}"
//             error={cellError}
//           />
//         </div>
//         <div className={styles.consent}>
//           <Checkbox
//             label="Acepto la Política de Privacidad"
//             name="privacy"
//             className={styles.check}
//           />
//           <Checkbox
//             label="Acepto la Política Comunicaciones Comerciales"
//             name="commercial"
//             className={styles.check}
//           />
//           <a href="#">Aplican Términos y Condiciones.</a>
//         </div>
//         <Button variant="primary" className={styles.button} type="submit">
//           Cotiza aquí
//         </Button>
//       </form>
//     </section>
//   );
// }
