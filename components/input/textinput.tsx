import styles from "./textinput.module.sass";

interface TextInput {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function TextInput({
  label,
  id,
  type = "text",
  placeholder = "",
  required = false,
  className = "",
}: TextInput) {
  return (
    <div className={`${styles.input} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} required={required} />
    </div>
  );
}
