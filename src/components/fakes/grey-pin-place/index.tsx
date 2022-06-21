import { useOutletContext } from "react-router-dom";
import styles from "./index.module.css";
import { useParams } from "react-router-dom";
import trans from "./trans.module.css";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import React from "react";

/**放在砖块布局组件的占位处的详情组件 */
const GreyPinPlace = () => {
  // const { c } = props;
  const [placeData]: any = useOutletContext();
  const { msgId } = useParams();
  const nodeRef = useRef<HTMLDivElement | null>(null);
  return <>
    <CSSTransition
      nodeRef={nodeRef}
      in={true}
      timeout={430}
      classNames={{
        appear: trans.place_appear,
        appearActive: trans.place_appear_active,
      }}
      appear={true}
      unmountOnExit>
      <div ref={nodeRef} className={styles.placeholder}>
        {placeData.init}: {msgId}
      </div>
    </CSSTransition>
  </>;
};

export default GreyPinPlace;
