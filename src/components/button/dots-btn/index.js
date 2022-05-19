import styles from "./index.module.css";

const DotsBtn = props => {
  const {selected, onClick} = props;
  return <button className={`${styles.btn_more} ${selected ? styles.selected : ''}`} onClick={onClick} style={{...props.style}}>
    <div className={styles.dots_menu_wrapper}>
      <div className={styles.dots_menu} />
    </div>
  </button>;
};

export default DotsBtn;