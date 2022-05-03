import styles from "./index.module.css";

const COLOR_LIGHT = 'light';
const COLOR_DARK = 'dark';

const SIZE_STRETCH = 'stretch';

const BtnPure = props => {
  const { colorType, size, customStyles } = props;
  const colorClass = (colorType === COLOR_DARK ? styles.dark : styles.light) || '';
  const sizeClass = (size === SIZE_STRETCH ? styles.stretch : '') || '';
  return <button
    className={`${styles.normal} ${colorClass} ${sizeClass}`}
    style={customStyles}>
    {props.children}
  </button>;
};

export default BtnPure;