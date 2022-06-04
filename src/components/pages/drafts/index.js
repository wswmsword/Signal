import styles from "./index.module.css";
import useMobile from "../../../hooks/useMobile";
import MediaPin from "../../media-pin-layout";
import GreyPinItem from "../../fakes/grey-pin-item";
import { random, genIdChars } from "../../../tools/number";
import withExpandableLayerForPin from "../../hoc/with-expandable-layer-for-pin";
import { useMemo } from "react";
/**速写 */
const Drafts = () => {
  const isMobile = useMobile();
  
  const itemsData = useMemo(() => [...Array(25)].map((_, i) => ({ id: genIdChars(), h: random(69, 361) })), []);
  const GreyPinItemWithExpandableLayerForPin = withExpandableLayerForPin(GreyPinItem);

  return <div className={styles.page_wrapper}>
    <div className={`${styles.content} ${isMobile ? styles.mobile : ''}`}>
      <h1>速写</h1>
      <p>速写：速写速写速写速写速写速写速写速写速写速写这里是速写，就像速写，拿起铅笔在纸上随意勾勒和涂改。</p>
    </div>
    <MediaPin
      mGap={12}
      gap={36}
      mItemW={180}
      itemW={210}
      itemsData={itemsData}
      ItemComp={GreyPinItemWithExpandableLayerForPin}
      disabledPlace={false}
      placeHeight={521} />
  </div>
};

export default Drafts;