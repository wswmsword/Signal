import styles from "./index.module.css";
import useMobile from "../../../hooks/useMobile";
import MediaPin from "../../media-pin-layout";
import greyPinItem from "../../fakes/grey-pin-item";
/**速写 */
const Drafts = () => {
  const isMobile = useMobile();
  const ItemComps = [...Array(25)].map(() => greyPinItem());

  return <div className={styles.page_wrapper}>
    <div className={`${styles.content} ${isMobile ? styles.mobile : ''}`}>
      <h1>速写</h1>
      <p>速写：速写速写速写速写速写速写速写速写速写速写这里是速写，就像速写，拿起铅笔在纸上随意勾勒和涂改。</p>
    </div>
    <MediaPin
      mGap={18}
      gap={36}
      mItemW={180}
      itemW={210}
      ItemComps={ItemComps} />
  </div>
};

export default Drafts;