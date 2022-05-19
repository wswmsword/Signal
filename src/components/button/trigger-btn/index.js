import styles from "./index.module.css";

const COLOR_COAL = 'coal';
const COLOR_SILVER = 'silver';

const BtnTrig = props => {
  const {selected, onClick, colorType} = props;
  const colorClass = (colorType === COLOR_COAL ? styles.coal : styles.silver) || '';
  return <button
    className={`${styles.trigger} ${selected ? styles.selected : ''} ${colorClass}`}
    onClick={onClick}
    style={{...props.style}}>
    <span>{props.children}</span>
    <span className={styles.arrow} />
  </button>;
};

export default BtnTrig;