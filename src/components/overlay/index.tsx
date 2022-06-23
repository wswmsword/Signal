import Portal from "../portal";
import styles from "./index.module.css";
import trans from "./trans.module.css";
import useKeyPress from "../../hooks/useKeyPress";
import { useEffect, useState, useRef, ReactNode, MouseEvent } from "react";
import { CSSTransition } from "react-transition-group";
import { assertIsNode } from "../../tools/ts";
import TouchBlock from "../touch-block";

/**悬浮页面组件 */
interface OverlayProps {
  children?: ReactNode;
  opened: boolean,
  close: () => void,
  antiTouch?: boolean,
}

const Overlay = (props: OverlayProps) => {
  const { opened, close, antiTouch } = props;
  const [openedTouchBlock, setOpenedTouchBlock] = useState(false);
  const nodeRef = useRef(null);

  // 切换防误触弹窗
  const switchTouchBlock = () => {
    setOpenedTouchBlock(v => !v);
  };

  const closeTouchBlock = () => {
    switchTouchBlock();
    close();
  };


  const closeHandler = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    const curTarget = e.currentTarget;
    const target = e.target;
    assertIsNode(curTarget);
    assertIsNode(target);
    const childNodes = curTarget.childNodes;
    let includedTarget = false;
    for (let i = 0; i < childNodes.length; i++) {
      if (includeTarget(childNodes[i], target)) {
        includedTarget = true;
        break;
      }
    }
    if (! includedTarget) {
      if (antiTouch) {
        switchTouchBlock();
      } else {
        close();
      }
    }
  };
  const escPress = useKeyPress("Escape");
  useEffect(() => {
    if (opened && escPress) {
      close();
    }
  }, [escPress]);

  const closeBar = (e: MouseEvent<Element>) => {
    close();
    e.stopPropagation();
  };

  useEffect(() => {
    const bodyE = document.getElementsByTagName("body");
    bodyE[0].style.overflow = "hidden";
    return () => {
      bodyE[0].style.overflow = "auto";
    };
  }, []);

  return <Portal>
    <div className={`${styles.overlay_bg}`} onClick={closeHandler}>
      <button className={styles.btn_close} onClick={closeBar} />
      <CSSTransition
        nodeRef={nodeRef}
        in={true}
        timeout={180}
        classNames={{
          appear: trans.page_appear,
          appearActive: trans.page_appear_active,
        }}
        appear={true}
        unmountOnExit>
        <div ref={nodeRef} className={styles.overlay_page}>
          {props.children}
        </div>
      </CSSTransition>
    </div>
    <div className={`${styles.tb_wrapper} ${openedTouchBlock ? styles.visible_tb : ''}`}>
      <TouchBlock title="确认关闭？" content="确认关闭将清空更改，是否确认关闭？" opened={openedTouchBlock} cancel={switchTouchBlock} close={closeTouchBlock} />
    </div>
  </Portal>;
};

function includeTarget(target: ChildNode, content: EventTarget) {
  assertIsNode(content);
  return target.contains(content);
}

export default Overlay;