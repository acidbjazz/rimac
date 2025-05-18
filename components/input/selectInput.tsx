import styles from "./selectInput.module.sass";

interface SelectInputProps {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function SelectInput({
  label,
  id,
  options,
  placeholder = "",
  required = false,
  className = "",
}: SelectInputProps) {
  return (
    <div className={`${styles.selectinput} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <div>
        <select id={`${id}-select`} required={required}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          required={required}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
