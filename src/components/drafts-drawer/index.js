import { useState } from "react";
import PanelDrawer from "../panel-drawer";
import Portal from "../portal/index.js";
import styles from "./index.module.css";

const DraftsDrawer = props => {
  const [opened, setOpened] = useState(false);

  const trigger = () => {
    setOpened(v => !v);
  };

  return <Portal>
    <div className={`${styles.drawer_wrapper} ${opened ? styles.opened : ''}`}>
      <PanelDrawer opened={opened} trigger={trigger} title="记速写">
        <ul>
          <li>信言不美，美言不信。善者不辩，辩者不善。知者不博，博者不知。</li>
          <li>爱是海，喜欢是海啸，而人是孤岛。</li>
          <li>世界很大，你要说话。</li>
          <li>不能因嘈杂而断联。Keep Online, Get Back.</li>
          <li>看过了你，才知道沉沦的美丽。</li>
          <li>晚安～</li>
        </ul>
      </PanelDrawer>
    </div>
  </Portal>;
};

export default DraftsDrawer;