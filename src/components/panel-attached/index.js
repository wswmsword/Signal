import styles from "./index.module.css";

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
  return <>
    <div className={`${styles.panel_wrapper} ${opened ? styles.opened : ''} ${colPosClass} ${rowPosClass}`}>
      {props.children}
    </div>
  </>;
};

export default PanelAttached;