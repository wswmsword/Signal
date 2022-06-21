import styles from "./index.module.css";
import useMobile from "../../../hooks/useMobile";
import { MemoizedMediaPin } from "../../media-pin-layout";
import GreyPinItem from "../../fakes/grey-pin-item";
import { random, genIdChars } from "../../../tools/number";
import withMsgLink from "../../hoc/with-msg-link";
import withExpandableForPin from "../../hoc/with-expandable-for-pin";
import { useCallback, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import React from "react";
import BtnBorder from "../../btn-border";
/**最新 */
const Latest = () => {
  const isMobile = useMobile();
  
  // const memoItemsData = useMemo(() => [...Array(25)].map((_, i) => ({ id: genIdChars(), h: random(69, 361) })), []);
  const [itemsData, setData] = useState([...Array(25)].map((_, i) => ({ id: genIdChars(), h: random(69, 361) })));
  const GreyPinItemWithMsgNavLink = useMemo(() => withMsgLink(GreyPinItem), []);
  const OutletWithExpandableForPin = useMemo(() => withExpandableForPin(Outlet), []);

  const loadMore = useCallback(() => {
    const nextData = [...Array(25)].map((_, i) => ({ id: genIdChars(), h: random(69, 361) }));
    setData(v => v.concat(nextData));
  }, []);
  return <>
    <div className={`${styles.content} ${isMobile ? styles.mobile : ''}`}>
      <h1>最新</h1>
      <p>最新：最新最新最新最新最新最新最新最新最新最新最新最新最新最新最新发现。Get Back. Let It Go. Real Love.</p>
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
    <div style={{
      height: "99px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <BtnBorder onClick={loadMore}>More</BtnBorder>
    </div>
  </>;
};

export default Latest;