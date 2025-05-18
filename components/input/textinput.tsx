import styles from "./textinput.module.sass";

interface TextInput {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  error?: string;
}

export default function TextInput({
  label,
  id,
  type = "text",
  required = false,
  className = "",
  value,
  onChange,
  pattern,
  error,
}: TextInput) {
  return (
    <div className={`${styles.input} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        required={required}
        value={value || ""}
        onChange={onChange}
        pattern={pattern}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
