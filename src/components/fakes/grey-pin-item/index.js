import styles from "./index.module.css";

const GreyPinItem = props => {
  // const h = random(69, 361);
  const { h, selected } = props;

  return <>
    <div
      className={`${styles.grey_box} ${selected ? styles.selected : ''}`}
      style={{
        width: `100%`,
        height: `${h || 100}px`,
      }}></div>
  </>;
};

export default GreyPinItem;