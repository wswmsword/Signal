import { useRef, useState } from "react";
import Portal from "../portal";
import styles from "./index.module.css";
import transition from "./transition.module.css";
import { CSSTransition } from "react-transition-group";

/**可展开文字的组件 */
const ExpandableText = props => {
  const {lineClamp} = props;

  const txtRef = useRef(null);
  const longTxtRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [exitedTxt, setExitedTxt] = useState(false);

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const padding = 18;
  const expandTxt = () => {
    const txtEle = txtRef.current;
    const { offsetHeight, scrollHeight, offsetTop, offsetWidth, offsetLeft } = txtEle;
    setTop(offsetTop - padding - 1);
    setLeft(offsetLeft - padding - 1);
    setHeight(scrollHeight);
    setWidth(offsetWidth);
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
            height: `${height}px`,
          }}>
          {props.children}
        </div>
      </CSSTransition>
    </Portal>
  </>;
}

export default ExpandableText;