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
  const { h, selected, readyToCalc, event, eventImgId, info } = props;
  const location = useLocation();
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
      <Link to={selected ? '' : `msgs/${info.data.id}`}>
        <div className={styles.content}></div>
      </Link>
      {event && <>
        <Link
          key={eventImgId}
          to={`/event/${eventImgId}`}
          // This is the trick! Set the `backgroundLocation` in location state
          // so that when we open the modal we still see the current page in
          // the background.
          state={{ backgroundLocation: location }}
        >
          <div className={styles.event} />
        </Link>
      </>}
    </div>
  </>;
};

export default GreyPinItem;