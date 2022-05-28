import { random } from "../../../tools/number";
import styles from "./index.module.css";

const greyPinItem = props => {
  const h = random(69, 520);
  return <>
    <div className={styles.grey_box} style={{
      width: `100%`,
      height: `${h}px`,
    }}></div>
  </>;
};

export default greyPinItem;