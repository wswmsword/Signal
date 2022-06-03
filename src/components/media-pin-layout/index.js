import { useState, useEffect, memo } from "react";
import PinLayout from "../pin-layout";
import withAutoColumn from "../hoc/with-auto-column";
import useMobile from "../../hooks/useMobile";

/**砖块布局移动桌面适配组件 */
const MediaPin = ({ mGap, gap, mItemW, itemW, ...rest }) => {
  const isMobile = useMobile();
  const [g, setG] = useState(gap);
  const [iW, setIW] = useState(itemW);
  const PinLayoutWithAutoCol = withAutoColumn(PinLayout, {
    gap: g,
    itemW: iW,
  });
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

export default memo(MediaPin);