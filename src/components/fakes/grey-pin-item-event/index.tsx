import { useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.css";
import { itemInfo } from "../../pin-layout/index";

type PinItemProps = {
  h: number;
  event: boolean;
  eventImgId?: number;
  selected: boolean;
  readyToCalc: () => {/* */};
  info: itemInfo;
}

const GreyPinItem = (props: PinItemProps) => {
  // const h = random(69, 361);
  const { h, selected, readyToCalc, info } = props;
  const location = useLocation();
  const locationState = (location.state || {}) as Record<string, unknown>;
  useLayoutEffect(() => {
    readyToCalc();
  }, []);
  return <>
    <div
      className={`${styles.grey_box} ${selected ? styles.selected : ''}`}
      style={{
        width: `100%`,
        height: `${h || 100}px`,
      }}>
      <Link
        to={selected ? '' : `msgs/${info.data.id}`}
        // 设置背景路由
        state={{ backgroundLocation: locationState.backgroundLocation }}>
        <div className={styles.content}></div>
      </Link>
    </div>
  </>;
};

export default GreyPinItem;