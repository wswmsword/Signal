import { useEffect, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";

/**根据屏幕宽度、每个项目的左右间隔、项目宽度，计算一行能放的项目数量 */
export default function withAutoColumn(WrappedComponent, { gap, itemW }) {
  return function WithAutoColumn(props) {
    const [colNum, setColNum] = useState(null);
    const size = useWindowSize();

    useEffect(() => {
      const windowW = size.width;
      if (windowW == null) { return ; }
      setColNum(calColsNum(itemW, itemW, gap, windowW));
    }, [size]);

    if (colNum) {
      return <WrappedComponent
        {...props}
        colNum={colNum}
      />
    } else {
      return <>Now Loading...</>
    }
  }
}

function calColsNum(accWidth, itemWidth, gap, windowW) {
  if (accWidth > windowW) { return 0; }
  return 1 + calColsNum(accWidth + gap + itemWidth, itemWidth, gap, windowW);
}