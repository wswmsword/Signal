import Portal from "../portal/index.js";
import useMobile from "../../hooks/useMobile";
import styles from "./index.module.css";

const MediaPanel = props => {
  const { opened, close, ChildComp, childProps } = props;
  const isMobileSize = useMobile();
  const closeHandler = e => {
    const childNodes = (e.currentTarget).childNodes;

    for (let i = 0; i < childNodes.length; i++) {
      if (!includeTarget(childNodes[i], e.target)) {
        close()
      }
    }
  }
  return <>
    {isMobileSize ?
      <Portal>
        <div className={`${styles.popover_bg} ${opened ? styles.visible : ''}`} onClick={closeHandler}>
          <ChildComp inPortal={true} {...childProps} />
        </div>
      </Portal> :
      <ChildComp {...childProps} />}
  </>
};

function includeTarget(target, content) {
  return target.contains(content);
}

export default MediaPanel;