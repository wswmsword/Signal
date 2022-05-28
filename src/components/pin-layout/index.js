import { useState, useRef, useEffect, Fragment } from "react";
import styles from "./index.module.css";

/**
 * 砖块布局组件
 * 
 * 设置宽度，子项目将均匀布局在宽度中；设置左右间隔，子项目将按间隔
 * 布局，宽度即子项目间隔后的宽度。
 */
export default function PinLayout({ width, itemWidth, colNum, ItemComps, gapX, gapY }) {
  // 容器宽度
  const [w, setW] = useState(0);
  // 容器高度
  const [h, setH] = useState(0);
  // 项目横向间隔
  const [g, setG] = useState(0);
  // 子项目数目
  const itemsLen = ItemComps.length;
  // top, left, ItemComp
  const [itemInfos, setItemInfos] = useState([...Array(itemsLen)].map((_, i) => ({
    top: 0,
    left: 0,
    ItemComp: ItemComps[i],
  })));

  const wrapperRef = useRef(null);

  useEffect(() => {
    // 如果提供宽度就根据宽度计算横向间隔，如果提供间隔就取间隔
    setG(gapX || Math.floor((width - itemWidth * colNum) / (colNum - 1)));
    // 如果提供宽度就取宽度，如果提供左右间隔就使用左右间隔计算宽度
    setW(width || gapX * (colNum - 1) + itemWidth * colNum);
  }, [width, gapX, colNum, itemWidth]);

  useEffect(() => {
    // 子项目数目
    const itemsLen = ItemComps.length;
    // 项目的高度
    const itemHs = Array.prototype.map.call(wrapperRef.current.childNodes, node => node.clientHeight);
    // 列的左边距离
    const colLs = [0];
    for (let i = 1; i < colNum; ++ i) {
      colLs.push(colLs[i - 1] + itemWidth + g);
    }
    // 项目的左边距离
    const itemLs = [];
    // 容器高度
    let wrapperH = 0;
    // 项目的上边距离
    const itemTs = [];
    // 每一纵列最下面项目的 id
    const colBottomIds = [];
    // 第一横排的容器高度、项目左边距离、项目顶部距离；纵列最下面项目的 id
    for (let i = 0; i < colNum; ++ i) {
      wrapperH = Math.max(wrapperH, itemHs[i]);
      itemLs.push(colLs[i])
      itemTs.push(0);
      colBottomIds.push(i);
    }
    // 第二行开始到最后一个项目的容器高度、项目左边距离、项目顶部距离；纵列最下面项目的 id
    for (let i = colNum; i < itemsLen; ++ i) {
      // 当前最短的纵列的列 id 与这一列最底部的项目 id
      const { minColId, minItemId } = getMinHeight(colNum, colBottomIds, itemTs, itemHs);
      const currentTop = itemTs[minItemId] + itemHs[minItemId] + gapY;
      wrapperH = Math.max(currentTop + itemHs[i], wrapperH);
      itemLs.push(colLs[minColId]);
      itemTs.push(currentTop);
      colBottomIds[minColId] = i;
    }
    
    setH(wrapperH);
    setItemInfos([...Array(itemsLen)].map((_, i) => ({
      top: itemTs[i],
      left: itemLs[i],
      ItemComp: ItemComps[i],
    })))
  }, [wrapperRef, w, itemWidth, colNum, ItemComps, g, gapY])
  return (<>
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      style={{
        width: `${w}px`,
        height: `${h}px`,
      }}>
      {itemInfos.map((item, i) => <Fragment key={i}>
        <div
          style={{
            position: "absolute",
            left: `${item.left}px`,
            top: `${item.top}px`,
            width: `${itemWidth}px`,
          }}>
          {item.ItemComp}
        </div>
      </Fragment>)}
    </div>
  </>)
};


function getMinHeight(colNum, colBottomIds, itemTops, itemHeights) {
  let minTop = itemTops[colBottomIds[0]] + itemHeights[colBottomIds[0]],
  minItemId = colBottomIds[0],
  minColId = 0;
  for (let i = 1; i < colNum; ++ i) {
    const itemId = colBottomIds[i];
    const curTop = itemTops[itemId] + itemHeights[itemId];
    if (curTop < minTop) {
      minTop = curTop;
      minItemId = itemId;
      minColId = i;
    }
  }
  return { minItemId, minColId };
}