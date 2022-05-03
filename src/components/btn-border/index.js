import styles from "./index.module.css";

/**
 * 边框按钮组件
 */
export default function BtnBorder(props) {
  return <button
    className={`${styles.btn_b}`}>
    {props.children}
  </button>;
}