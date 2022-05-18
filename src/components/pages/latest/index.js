import styles from "./index.module.css";
import useMobile from "../../../hooks/useMobile";
/**最新 */
const Latest = () => {
  const isMobile = useMobile();
  return <div className={styles.page_wrapper}>
    <div className={`${styles.content} ${isMobile ? styles.mobile : ''}`}>
      <h1>最新</h1>
      <p>最新：最新最新最新最新最新最新最新最新最新最新最新最新最新最新最新发现。Get Back. Let It Go. Real Love.</p>
    </div>
  </div>
};

export default Latest;