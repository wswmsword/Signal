import styles from "./index.module.css";

interface InputShadowProps {
  value?: string;
  size?: "small" | "normal" | "big";
}

const InputShadow = (props: InputShadowProps) => {
  const { value, size } = props;
  const sizeClass = styles[size || "normal"];
  return <>
    <input className={`${styles.groove_shadow} ${sizeClass}`} value={value} />
  </>;
};

export default InputShadow;