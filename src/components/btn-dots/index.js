import styles from "./index.module.css";

const BtnDots = props => {
  const {selected, onClick} = props;
  return <button className={`${styles.btn_more} ${selected ? styles.selected : ''}`} onClick={onClick}>
    <div className={styles.dots_menu} />
  </button>;
};

export default BtnDots;