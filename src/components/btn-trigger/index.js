import styles from "./index.module.css";


const BtnTrig = props => {
  const {selected, onClick} = props;
  return <button
    className={`${styles.trigger} ${selected ? styles.selected : ''}`}
    onClick={onClick}>
    {props.children}
  </button>;
};

export default BtnTrig;