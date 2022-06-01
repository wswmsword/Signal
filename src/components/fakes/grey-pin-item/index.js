import styles from "./index.module.css";

const GreyPinItem = props => {
  // const h = random(69, 361);
  const { h } = props;

  return <>
    <div
      className={styles.grey_box}
      style={{
        width: `100%`,
        height: `${h || 100}px`,
      }}></div>
  </>;
};

export default GreyPinItem;