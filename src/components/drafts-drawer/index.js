import React, { useState } from "react";
import PanelDrawer from "../panel-drawer";
import Portal from "../portal/index.js";
import styles from "./index.module.css";
import draftsData from "./fake.js";
import BtnBorder from "../btn-border";
import useMobile from "../../hooks/useMobile";

/**
 * 速写抽屉组件
 */
const DraftsDrawer = () => {
  const [drafts] = useState(draftsData)
  const [opened, setOpened] = useState(false);
  const [message, setMessage] = useState('');

  const isMobileSize = useMobile();

  const trigger = () => {
    setOpened(v => !v);
  };

  // @ts-ignore
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return <Portal>
    <div className={`${styles.drawer_wrapper} ${opened ? styles.opened : ''}`}>
      <PanelDrawer opened={opened} trigger={trigger} title="记速写">
        <div className={styles.drawer_inner}>
          <ul className={styles.drafts_list}>
            {drafts.map(draft => <React.Fragment key={draft.id}>
              <li className={`${styles.draft_item}`}><div className="ellipsis-2">{draft.content}</div></li>
            </React.Fragment>)}
          </ul>
          <div className={styles.editor_wrapper}>
            <div className={styles.text_area_wrapper}>
              <textarea
                className={`${styles.text_message} groove_shadow ${isMobileSize ? styles.mobile : ''}`}
                value={message}
                onChange={handleMessageChange} />
            </div>
            <div className={styles.draft_funcs_wrapper}>
              <div className={styles.btn_flow}><BtnBorder>放大</BtnBorder></div>
              <div className={styles.btn_new}><BtnBorder>创建</BtnBorder></div>
            </div>
          </div>
        </div>
      </PanelDrawer>
    </div>
  </Portal>;
};

export default DraftsDrawer;