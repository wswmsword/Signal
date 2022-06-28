import styles from "./index.module.css";
import useMobile from "../../../hooks/useMobile";
import MediaPin, { /* MemoizedMediaPin */ } from "../../media-pin-layout";
import GreyPinItem from "../../fakes/grey-pin-item";
import { random, genIdChars } from "../../../tools/number";
import withExpandableForPin from "../../hoc/with-expandable-for-pin";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { getRandomId as getRandomEventId } from "../event/images";
import BtnBorder from "../../btn-border";
import withInfinitScrolling from "../../../components/hoc/with-infinit-scrolling/index";
type latestItem = {
  id: string,
  h: number,
  event: boolean,
  eventImgId?: number,
}
/**最新 */
const Latest = () => {
  const isMobile = useMobile();
  const hasMounted = useRef(false); // 是否第一次加载完数据
  const [disabledIS, setDisabledIS] = useState(false); // 禁止无限滚动
  const [itemsData, setData] = useState<latestItem[]>([]);
  const OutletWithExpandableForPin = useMemo(() => withExpandableForPin(Outlet), []);

  const loadMore = useCallback(() => {
    const nextData = [...Array(25)].map((_, i): latestItem => ({
      id: genIdChars(),
      h: random(69, 361),
      event: random(0, 1) === 0,
      eventImgId: getRandomEventId(),
    }));
    setData(v => v.concat(nextData));
  }, []);
  const nextPage = useCallback(() => {
    if (! hasMounted.current) { return ; }
    loadMore();
    console.log('ehrh >>');
  }, []);
  const MediaPinWithInfinitScrolling = useMemo(() => withInfinitScrolling(MediaPin, {
    onReachBottom: nextPage,
  }), []);

  // 首次加载数据
  useEffect(() => {
    loadMore();
    setTimeout(() => {
      hasMounted.current = true;
    }, 100);
  }, []);

  const diableIS = useCallback(() => {
    setDisabledIS(v => !v);
  }, []);

  return <>
    <div className={`${styles.content} ${isMobile ? styles.mobile : ''}`}>
      <h1>最新</h1>
      <p>最新：最新最新最新最新最新最新最新最新最新最新最新最新最新最新最新发现。Get Back. Let It Go. Real Love.</p>
    </div>
    <div style={{
      position: 'fixed',
      zIndex: 3,
      left: '18px',
      bottom: '5px',
    }}>
      <BtnBorder onClick={diableIS}>{disabledIS ? '开启无限滚动' : '禁止无限滚动'}</BtnBorder>
    </div>
    <MediaPinWithInfinitScrolling
      disabledIS={disabledIS}
      mGap={12}
      gap={36}
      mItemW={180}
      itemW={210}
      itemsData={itemsData}
      ItemComp={GreyPinItem}
      PlaceComp={OutletWithExpandableForPin}
      placeHeight={521} />
    {disabledIS && <div style={{
      height: "99px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <BtnBorder onClick={loadMore}>More</BtnBorder>
    </div>}
  </>;
};

export default Latest;