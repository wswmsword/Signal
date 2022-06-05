import styles from "./index.module.css";
import useMobile from "../../../hooks/useMobile";
import { MemoizedMediaPin } from "../../media-pin-layout";
import GreyPinItem from "../../fakes/grey-pin-item";
import { random, genIdChars } from "../../../tools/number";
import withMsgLink from "../../hoc/with-msg-link";
import withExpandableForPin from "../../hoc/with-expandable-for-pin";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";
/**速写 */
const Drafts = () => {
  const isMobile = useMobile();
  
  const itemsData = useMemo(() => [...Array(25)].map((_, i) => ({ id: genIdChars(), h: random(69, 361) })), []);
  const GreyPinItemWithMsgNavLink = withMsgLink(GreyPinItem);
  const OutletWithExpandableForPin = withExpandableForPin(Outlet);

  return <div className={styles.page_wrapper}>
    <div className={`${styles.content} ${isMobile ? styles.mobile : ''}`}>
      <h1>速写</h1>
      <p>速写：速写速写速写速写速写速写速写速写速写速写这里是速写，就像速写，拿起铅笔在纸上随意勾勒和涂改。</p>
    </div>
    <MemoizedMediaPin
      mGap={12}
      gap={36}
      mItemW={180}
      itemW={210}
      itemsData={itemsData}
      ItemComp={GreyPinItemWithMsgNavLink}
      PlaceComp={OutletWithExpandableForPin}
      placeHeight={521} />
  </div>
};

export default Drafts;