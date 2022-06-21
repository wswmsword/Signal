import styles from "./index.module.css";

interface InputShadowProps {
  value?: string;
}

const InputShadow = (props: InputShadowProps) => {
  const { value } = props;
  return <>
    <input className={styles.groove_shadow} value={value} />
  </>;
};

export default InputShadow;