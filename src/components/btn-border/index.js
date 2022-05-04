import styles from "./index.module.css";

const SIZE_STRETCH = 'stretch';

/**
 * 边框按钮组件
 */
export default function BtnBorder(props) {
  const {onClick, size} = props;
  const sizeClass = (size === SIZE_STRETCH ? styles.stretch : '') || '';
  return <button
    onClick={onClick}
    className={`${styles.btn_b} ${sizeClass}`}>
    {props.children}
  </button>;
}