import styles from "./index.module.css";

const InputShadow = props => {
  const { value } = props;
  return <>
    <input className={styles.groove_shadow} value={value} />
  </>
}

export default InputShadow;