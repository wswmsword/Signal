import Portal from "../portal";
import styles from "./index.module.css";
import useKeyPress from "../../hooks/useKeyPress.js";
import { useEffect } from "react";

const Popover = props => {
  const { opened, close } = props;
  const closeHandler = e => {
    const childNodes = (e.currentTarget).childNodes;

    for (let i = 0; i < childNodes.length; i++) {
      if (!includeTarget(childNodes[i], e.target)) {
        close()
      }
    }
  };
  const escPress = useKeyPress("Escape");
  useEffect(() => {
    if (escPress) {
      close()
    }
  }, [escPress])
  return <Portal>
    <div className={`${styles.popover_bg} ${opened ? styles.visible : ''}`} onClick={closeHandler}>
      {props.children}
    </div>
  </Portal>;
};

function includeTarget(target, content) {
  return target.contains(content);
}

export default Popover;