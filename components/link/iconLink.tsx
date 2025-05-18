import styles from "./iconLink.module.sass";

import Link from "next/link";

interface IconLink {
  href?: string;
  children?: React.ReactNode;
  icon?: React.ElementType;
  className?: string;
}
export default function BackButton({ href = "#", children, className = "", icon: Icon }: IconLink) {
  return (
    <Link href={href} className={`${styles.backButton} ${className}`}>
      {Icon && <Icon />}
      <span>{children}</span>
    </Link>
  );
}
