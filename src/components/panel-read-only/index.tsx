import { ReactNode } from "react";
import styles from "./index.module.css";

interface PanelProps {
  opened?: boolean;
  title?: string;
  children?: ReactNode,
}

const PanelReadOnly = (props: PanelProps) => {
  const { opened, title } = props;

  return <>
    <div className={`${styles.pannel_wrapper} ${opened ? styles.opened : ''}`}>
      <div className={styles.title_wrapper}>
        <div className={styles.title}>{title || "默认标题"}</div>
      </div>
      <div className={styles.pannel_inner}>
        { props.children }
      </div>
    </div>
  </>;
};

export default PanelReadOnly;