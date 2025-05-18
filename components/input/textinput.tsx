import styles from "./textinput.module.sass";

interface TextInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

export default function TextInput({ label, error, className = "", ...props }: TextInput) {
  return (
    <div className={`${styles.input} ${className}`}>
      <label htmlFor={props.id}>{label}</label>
      <input {...props} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
