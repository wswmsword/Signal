import { ReactNode, useEffect, useRef, useState } from "react";
import Portal from "../portal";
import styles from "./index.module.css";
import transition from "./transition.module.css";
import { CSSTransition } from "react-transition-group";
import useCollapseRect from "../../hooks/useCollapseRect";

type ExpandableTextProps = {
  lineClamp: number,
  disabledScroll?: boolean,
  children?: ReactNode,
};

/**可展开文字的组件 */
const ExpandableText = (props: ExpandableTextProps) => {
  const { lineClamp, disabledScroll } = props;

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

  const rect = useCollapseRect(txtRef, collapsed);

  useEffect(() => {
    const txtEle = txtRef.current;
    const { scrollHeight } = txtEle;
    if (rect == null) { return ; }
    const { left, top, width } = rect;
    const finalLeft = left;
    const finalTop = top;
    setTop(finalTop - padding - 1 + window.scrollY);
    setLeft(finalLeft - padding - 1);
    setHeight(scrollHeight);
    setWidth(width + 1);

  }, [rect]);

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

  useEffect(() => {
    const set = () => { collapseTxt(); };
    if (expanded) {
      if (disabledScroll) {
        window.addEventListener("wheel", set);
        window.addEventListener("click", set);
        window.addEventListener("touchmove", set);
      }
    }
    return () => {
      window.removeEventListener("wheel", set);
      window.removeEventListener("click", set);
      window.removeEventListener("touchmove", set);
    };
  }, [disabledScroll, expanded]);

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
};

export default ExpandableText;