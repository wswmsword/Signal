import styles from "./index.module.css";

const COLOR_COAL = 'coal';
const COLOR_SILVER = 'silver';

const BtnTrig = props => {
  const {selected, onClick, colorType} = props;
  const colorClass = (colorType === COLOR_COAL ? styles.coal : styles.silver) || '';
  return <button
    className={`${styles.trigger} ${selected ? styles.selected : ''} ${colorClass}`}
    onClick={onClick}>
    {props.children}
  </button>;
};

export default BtnTrig;