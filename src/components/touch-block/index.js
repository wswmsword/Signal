import PanelReadOnly from "../panel-read-only";
import BtnBorder from "../btn-border";
import styles from "./index.module.css";

/**
 * 防误触组件
 */
const TouchBlock = ({title, content, opened, close, cancel}) => {
  return <>
    <PanelReadOnly title={title} opened={opened}>
      <div className={styles.content_wrapper}>
        {content}
      </div>
      <div className={styles.funcs_wrapper}>
        <div className={styles.func}><BtnBorder size="stretch" onClick={cancel}>后退</BtnBorder></div>
        <div className={styles.func}><BtnBorder size="stretch" onClick={close}>确认关闭</BtnBorder></div>
      </div>
    </PanelReadOnly>
  </>;
};

export default TouchBlock;