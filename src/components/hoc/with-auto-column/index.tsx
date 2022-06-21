import React from "react";
import { useEffect, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";

interface hocProps {
  gap: number;
  itemW: number;
}

interface ExtraInfo {
  colNum: number;
}

/**根据屏幕宽度、每个项目的左右间隔、项目宽度，计算一行能放的项目数量 */
export default function withAutoColumn<P>(WrappedComponent: React.ComponentType<P>, { gap, itemW }: hocProps) {
  return function WithAutoColumn(props: Omit<P, keyof ExtraInfo>) {
    const [colNum, setColNum] = useState<number | null>(null);
    const size = useWindowSize();

    useEffect(() => {
      const windowW = size.width;
      if (windowW == null) { return; }
      const colNum = calColsNum(itemW, itemW, gap, windowW);
      setColNum(colNum);
    }, [size]);

    if (colNum) {
      return <WrappedComponent
        {...(props) as P}
        colNum={colNum}
      />;
    } else {
      return <>Now Loading...</>;
    }
  };
}

function calColsNum(accWidth: number, itemWidth: number, gap: number, windowW: number): number {
  if (accWidth > windowW) { return 0; }
  return 1 + calColsNum(accWidth + gap + itemWidth, itemWidth, gap, windowW);
}