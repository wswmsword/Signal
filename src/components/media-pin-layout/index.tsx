import { useState, useEffect, memo, useMemo } from "react";
import PinLayout, { PinProps } from "../pin-layout";
import withAutoColumn from "../hoc/with-auto-column";
import useMobile from "../../hooks/useMobile";

interface MediaPinProps extends PinProps {
  mGap: number,
  gap: number,
  mItemW: number,
  itemW: number,
}

interface ExtraInfo {
  colNum: number;
  itemWidth: number;
}

/**砖块布局移动桌面适配组件 */
const MediaPin = ({ mGap, gap, mItemW, itemW, ...rest }: Omit<MediaPinProps, keyof ExtraInfo>) => {
  const isMobile = useMobile();
  const [g, setG] = useState(gap);
  const [iW, setIW] = useState(itemW);
  const PinLayoutWithAutoCol = useMemo(() => withAutoColumn(PinLayout, {
    gap: g,
    itemW: iW,
  }), [g, iW]);
  useEffect(() => {
    if (isMobile) {
      setG(mGap);
      setIW(mItemW);
    } else {
      setG(gap);
      setIW(itemW);
    }
  }, [isMobile, mGap, gap, mItemW, itemW]);
  return <>
    <PinLayoutWithAutoCol {...rest} gapX={g} gapY={g} itemWidth={iW} />
  </>;
};

export default MediaPin;

const MemoizedMediaPin = memo(MediaPin);

export { MemoizedMediaPin };