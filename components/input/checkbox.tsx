import styles from "./checkbox.module.sass";

interface Checkbox {
  label: string;
  name: string;
  className?: string;
}

export default function Checkbox({ label, name, className = "" }: Checkbox) {
  return (
    <div className={`${styles.check} ${className}`}>
      <label>
        <input type="checkbox" name={name} />
        <span>{label}</span>
      </label>
    </div>
  );
}
