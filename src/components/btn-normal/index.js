import styles from "./index.module.css";

const BtnNormal = props => {
  return <button className={styles.normal}>
    {props.children}
  </button>
};

export default BtnNormal;