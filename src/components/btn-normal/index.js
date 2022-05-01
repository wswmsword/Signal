import styles from "./index.module.css";

const COLOR_LIGHT = 'light';
const COLOR_DARK = 'dark';

const BtnNormal = props => {
  const { customStyle, colorType } = props;
  const colorClass = (colorType === COLOR_DARK ? styles.dark : styles.light) || '';
  return <button
    className={`${styles.normal} ${colorClass}`}
    style={customStyle}>
    {props.children}
  </button>;
};

export default BtnNormal;