import styles from "./index.module.css";
import transition from "./transition.module.css";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

const COL_POS = {
  TOP: "top",
  BOTTOM: "bottom",
  MIDDLE: "middle",
};

const COL_CLASS = {
  [COL_POS.TOP]: styles.col_top,
  [COL_POS.BOTTOM]: styles.col_bottom,
  [COL_POS.MIDDLE]: styles.col_middle,
}

const ROW_POS = {
  LEFT: "left",
  RIGHT: "right",
  MIDDLE: "middle",
}

const ROW_CLASS = {
  [ROW_POS.LEFT]: styles.row_left,
  [ROW_POS.RIGHT]: styles.row_right,
  [ROW_POS.MIDDLE]: styles.row_middle,
}

const PanelAttached = props => {
  const { opened, colPos, rowPos } = props;
  const colPosClass = COL_CLASS[colPos];
  const rowPosClass = ROW_CLASS[rowPos];
  const nodeRef = useRef(null);
  return <CSSTransition
    nodeRef={nodeRef}
    in={opened}
    timeout={200}
    classNames={{
      enter: transition.panel_enter,
      enterActive: transition.panel_enter_active,
      exit: transition.panel_exit,
      exitActive: transition.panel_exit_active,
    }}
    unmountOnExit>
    <div ref={nodeRef} className={`${styles.panel_wrapper} ${colPosClass} ${rowPosClass}`}>
      {props.children}
    </div>
  </CSSTransition>;
};

export default PanelAttached;