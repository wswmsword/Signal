import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

interface PanelDrawerProps {
  opened: boolean;
  trigger: () => void;
  title: string;
  children?: ReactNode;
}

const PanelDrawer = (props: PanelDrawerProps) => {
  const { opened, trigger, title } = props;
  const innerDomRef = useRef<HTMLDivElement>(null);
  const [innerHeight, setInnerHeight] = useState<number | null>(null);
  useEffect(() => {
    if (innerDomRef.current) {
      setInnerHeight(innerDomRef.current.clientHeight);
    }
  }, []);

  return <>
    <div className={`${styles.panel_wrapper} ${opened ? styles.opened : ''}`}>
      <div className={styles.title_wrapper}>
        <div className={styles.title}>{title || "默认标题"}</div>
        <div className={styles.close_wrapper}>
          <button className={styles.btn_trigger} onClick={trigger}></button>
        </div>
      </div>
      <div ref={innerDomRef} className={`${styles.panel_inner} ${opened ? styles.opened : ''}`} style={{
        height: innerHeight == null ? 'auto' : (opened ? `${innerHeight}px` : 0),
      }}>
        { props.children }
      </div>
    </div>
  </>;
};

export default PanelDrawer;