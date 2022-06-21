import styles from "./index.module.css";
import useMobile from "../../../hooks/useMobile";
/**房间 */
const Rooms = () => {
  const isMobile = useMobile();
  return <div className={styles.page_wrapper}>
    <div className={`${styles.content} ${isMobile ? styles.mobile : ''}`}>
      <h1>房间</h1>
      <p>房间：事件事件事件事件事件事件事件事件事件事件事件事件事件都在房间里，进门请拿钥匙和脱鞋。</p>
    </div>
  </div>;
};

export default Rooms;