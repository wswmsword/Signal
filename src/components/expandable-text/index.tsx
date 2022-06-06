import { MutableRefObject, useEffect, useRef, useState } from "react";
import Portal from "../portal";
import styles from "./index.module.css";
import transition from "./transition.module.css";
import { CSSTransition } from "react-transition-group";
import { useRect } from "../../hooks/useRect";
import React from "react";

type ExpandableTextProps = {
  lineClamp: number,
  children?: React.ReactNode,
};

/**可展开文字的组件 */
const ExpandableText = (props: ExpandableTextProps) => {
  const { lineClamp } = props;

  const txtRef = useRef<any>(null);
  const longTxtRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [exitedTxt, setExitedTxt] = useState(false);

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const padding = 18;

  const rect = useRect(txtRef);

  useEffect(() => {
    if (collapsed) { return ; }
    const txtEle = txtRef.current;
    const { scrollHeight } = txtEle;
    if (rect == null) { return ; }
    const { left, top, width } = rect;
    setTop(top - padding - 1);
    setLeft(left - padding - 1);
    setHeight(scrollHeight);
    setWidth(width + 1);
  }, [collapsed, rect])

  const expandTxt = () => {
    setCollapsed(false);
  };
  const collapseTxt = () => {
    setExpanded(false);
  };
  const exitedTxtHandler = () => {
    setExpanded(true);
    setExitedTxt(true);
  };
  const exitedLongTxtHandler = () => {
    setCollapsed(true);
    setExitedTxt(false);
  };
  return <>
    <CSSTransition
      nodeRef={txtRef}
      in={collapsed}
      timeout={200}
      onExited={exitedTxtHandler}
      classNames={{
        enter: transition.long_txt_enter,
        enterActive: transition.long_txt_enter_active,
        exit: transition.long_txt_exit,
        exitActive: transition.long_txt_exit_active,
      }}>
      <div
        ref={txtRef}
        className={`${styles.txt} ellipsis-5 ${exitedTxt ? styles.hidden : styles.shown}`}
        onClick={expandTxt}
        style={{
          WebkitLineClamp: lineClamp,
          lineClamp: lineClamp,
        }}>
        {props.children}
      </div>
    </CSSTransition>
    <Portal>
      <CSSTransition
        nodeRef={longTxtRef}
        in={expanded}
        timeout={200}
        onExited={exitedLongTxtHandler}
        classNames={{
          enter: transition.long_txt_enter,
          enterActive: transition.long_txt_enter_active,
          exit: transition.long_txt_exit,
          exitActive: transition.long_txt_exit_active,
        }}
        unmountOnExit>
        <div
          ref={longTxtRef}
          onClick={collapseTxt}
          className={`${styles.txt} ${styles.expanded_txt}`}
          style={{
            padding: `${padding}px`,
            left: `${left}px`,
            top: `${top}px`,
            width: `${width}px`,
            // height: `${height}px`,
          }}>
          {props.children}
        </div>
      </CSSTransition>
    </Portal>
  </>;
}

export default ExpandableText;