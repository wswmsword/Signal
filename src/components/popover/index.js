import Portal from "../portal";
import styles from "./index.module.css";
import transition from "./transition.module.css"
import useKeyPress from "../../hooks/useKeyPress.js";
import TouchBlock from "../touch-block";
import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

const Popover = props => {
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

  const closeHandler = e => {
    e.stopPropagation();
    const childNodes = (e.currentTarget).childNodes;

    for (let i = 0; i < childNodes.length; i++) {
      if (!includeTarget(childNodes[i], e.target)) {
        if (antiTouch) {
          switchTouchBlock();
        } else {
          close();
        }
      }
    }
  };
  const escPress = useKeyPress("Escape");
  useEffect(() => {
    if (opened && escPress) {
      if (antiTouch) {
        switchTouchBlock();
      } else {
        close();
      }
    }
  }, [escPress])

  return <Portal>
    <CSSTransition
      nodeRef={nodeRef}
      in={opened}
      timeout={200}
      classNames={{
        enter: transition.popover_bg_enter,
        enterActive: transition.popover_bg_enter_active,
        exit: transition.popover_bg_exit,
        exitActive: transition.popover_bg_exit_active,
      }}
      unmountOnExit>
      <div ref={nodeRef} className={`${styles.popover_bg}`} onClick={closeHandler}>
        <div>
          {props.children}
          <div className={`${styles.tb_wrapper} ${openedTouchBlock ? styles.visible_tb : ''}`}>
            <TouchBlock title="确认关闭？" content="确认关闭将清空更改，是否确认关闭？" opened={openedTouchBlock} cancel={switchTouchBlock} close={closeTouchBlock} />
          </div>
        </div>
      </div>
    </CSSTransition>
  </Portal>;
};

function includeTarget(target, content) {
  return target.contains(content);
}

export default Popover;