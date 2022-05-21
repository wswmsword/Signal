import styles from "./index.module.css";
import useMobile from "../../../hooks/useMobile";
/**房间 */
const Rooms = () => {
  const isMobile = useMobile();
  return <div className={styles.page_wrapper}>
    <div className={`${styles.content} ${isMobile ? styles.mobile : ''}`}>
      <h1>房间：</h1>
      <p>房间：事件事件事件事件事件事件事件事件事件事件事件事件事件都在房间里。第一个进门的人把钥匙分给每个人，如果他变幻了钥匙，其他人就不能进来。</p>
    </div>
  </div>
};

export default Rooms;