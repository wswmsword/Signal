import { useState, useEffect } from "react";
import Panel from "../../panel";
import styles from "./editor.module.css";
import BtnBorder from "../../btn-border";
import Popover from "../../popover";

/**弹出编辑面板组件 */
const PopoverEditor = props => {
  const { opened, title, close, intro, } = props;

  const [ delay, setDelay ] = useState(false);

  const saveCollectionInfo = () => {
    console.log("Saved!");
  };

  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        setDelay(true);
      }, 0);
    } else {
      setDelay(false);
    }
  }, [opened]);
  return <>
    <Popover opened={opened} close={close} antiTouch>
      <Panel opened={opened && delay} title={`编辑“${title}”`} width={420} close={close}>
        <div className={styles.title_wrapper}>
          <div className={styles.title_title}>标题</div>
          <input
            className={`${styles.input_event} groove_shadow`}
            type="text"
            value={title}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChange={() => {}} />
        </div>
        <div className={styles.intro_wrapper}>
          <div className={styles.intro_title}>介绍</div>
          <textarea
            className={`${styles.text_message} groove_shadow`}
            value={intro}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChange={() => {}} />
        </div>
        <div className={styles.funcs_wrapper}>
          <div className={styles.col_func}><BtnBorder size="" onClick={close}>取消</BtnBorder></div>
          <div className={styles.col_func}><BtnBorder size="" onClick={saveCollectionInfo}>保存</BtnBorder></div>
        </div>
      </Panel>
    </Popover>
  </>;
};

export default PopoverEditor;