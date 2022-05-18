import styles from "./index.module.css";
import useMobile from "../../../hooks/useMobile";
/**速写 */
const Drafts = () => {
  const isMobile = useMobile();
  return <div className={styles.page_wrapper}>
    <div className={`${styles.content} ${isMobile ? styles.mobile : ''}`}>
      <h1>速写</h1>
      <p>速写：速写速写速写速写速写速写速写速写速写速写这里是速写，就像速写，拿起铅笔在纸上随意勾勒和涂改。</p>
    </div>
  </div>
};

export default Drafts;