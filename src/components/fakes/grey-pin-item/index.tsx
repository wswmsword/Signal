import { useLayoutEffect } from "react";
import styles from "./index.module.css";
import React from "react";

type PinItemProps = {
  h: number;
  selected: boolean;
  readyToCalc: () => {/* */};
}

const GreyPinItem = (props: PinItemProps) => {
  // const h = random(69, 361);
  const { h, selected, readyToCalc } = props;
  useLayoutEffect(() => {
    readyToCalc();
  }, []);
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