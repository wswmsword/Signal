import Portal from "../portal";
import styles from "./index.module.css";
import useKeyPress from "../../hooks/useKeyPress.js";
import TouchBlock from "../touch-block";
import { useEffect, useState } from "react";

const Popover = props => {
  const { opened, close, antiTouch } = props;
  const [openedTouchBlock, setOpenedTouchBlock] = useState(false);

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
    
    <div className={`${styles.popover_bg} ${opened ? styles.visible : ''}`} onClick={closeHandler}>
      <div>
        {props.children}
        <div className={`${styles.tb_wrapper} ${openedTouchBlock ? styles.visible_tb : ''}`}>
          <TouchBlock title="确认关闭？" content="确认关闭将清空更改，是否确认关闭？" opened={openedTouchBlock} cancel={switchTouchBlock} close={closeTouchBlock} />
        </div>
      </div>
    </div>
      
    
    
  </Portal>;
};

function includeTarget(target, content) {
  return target.contains(content);
}

export default Popover;