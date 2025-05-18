import styles from "./checkbox.module.sass";

interface Checkbox extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

export default function Checkbox({ label, error, className = "", ...props }: Checkbox) {
  return (
    <div className={`${styles.check} ${className}`}>
      <label>
        <input type="checkbox" {...props} />
        <span>{label}</span>
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
