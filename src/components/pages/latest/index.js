import styles from "./index.module.css";
import useMobile from "../../../hooks/useMobile";
import MediaPin from "../../media-pin-layout";
import greyPinItem from "../../fakes/grey-pin-item";
/**最新 */
const Latest = () => {
  const isMobile = useMobile();
  const ItemComps = [...Array(25)].map(() => greyPinItem());

  return <div className={styles.page_wrapper}>
    <div className={`${styles.content} ${isMobile ? styles.mobile : ''}`}>
      <h1>最新</h1>
      <p>最新：最新最新最新最新最新最新最新最新最新最新最新最新最新最新最新发现。Get Back. Let It Go. Real Love.</p>
    </div>
    <MediaPin
      mGap={12}
      gap={36}
      mItemW={180}
      itemW={210}
      ItemComps={ItemComps} />
  </div>
};

export default Latest;