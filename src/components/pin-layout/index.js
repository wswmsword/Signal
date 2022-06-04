import { useState, useRef, useEffect, Fragment } from "react";
import { Outlet } from "react-router-dom";
import styles from "./index.module.css";

/**
 * 砖块布局组件
 * 
 * 设置宽度，子项目将均匀布局在宽度中；设置左右间隔，子项目将按间隔
 * 布局，宽度即子项目间隔后的宽度。
 */
export default function PinLayout({ width, itemWidth, colNum, gapX, gapY, placeHeight = 521, ItemComp, itemsData = [], disabledPlace }) {
  // 容器宽度
  const [w, setW] = useState(0);
  // 容器高度
  const [h, setH] = useState(0);
  // 容器的初始高度
  const [h2, setH2] = useState(0);
  // 项目横向间隔
  const [g, setG] = useState(0);
  // 子项目数目
  const itemsLen = itemsData.length;
  // top, left, ItemComp，项目信息
  const [itemInfos, setItemInfos] = useState([...Array(itemsLen)].map((_, i) => ({
    id: 0,
    top: 0, // 项目顶部与容器顶部的距离
    left: 0, // 项目的左边与容器左边的距离
    height: 0, // 项目高度
    colId: 0, // 项目所在纵列
    offsetY: 0, // 项目偏移距离
    data: itemsData[i],
  })));
  // 每一纵列由上至下的项目信息
  const [infosDividedByCols, setInfosDividedByCols] = useState([]);
  // 选中的项目 id
  const [selectedItem, setSelectedItem] = useState(null);
  // const [placeholderTop, setPlaceholderTop] = useState(0);
  // 详情区域距离顶部的距离
  const [placeT, setPlaceTop] = useState(0);
  const [placeData, setPlaceData] = useState({ init: "bird" });

  const wrapperRef = useRef(null);

  useEffect(() => {
    // 如果提供宽度就根据宽度计算横向间隔，如果提供间隔就取间隔
    setG(gapX || Math.floor((width - itemWidth * colNum) / (colNum - 1)));
    // 如果提供宽度就取宽度，如果提供左右间隔就使用左右间隔计算宽度
    setW(width || gapX * (colNum - 1) + itemWidth * colNum);
  }, [width, gapX, colNum, itemWidth]);

  useEffect(() => {
    // 子项目数目
    const itemsLen = itemsData.length;
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
    // 每一纵列底部项目的 id
    const colBottomIds = [];
    // 项目的所在列 id
    const itemCs = [];
    // 第一横排的容器高度、项目左边距离、项目顶部距离；纵列最下面项目的 id
    for (let i = 0; i < colNum; ++ i) {
      wrapperH = Math.max(wrapperH, itemHs[i]);
      itemLs.push(colLs[i]);
      itemTs.push(0);
      itemCs.push(i);
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
      itemCs.push(minColId);
      colBottomIds[minColId] = i;
    }
    
    setH(wrapperH);
    setH2(wrapperH);
    // 生成项目信息
    const itemInfos = [...Array(itemsLen)].map((_, i) => ({
      id: i,
      top: itemTs[i],
      left: itemLs[i],
      height: itemHs[i],
      colId: itemCs[i],
      offsetY: 0,
      data: itemsData[i],
    }));
    setItemInfos(itemInfos);
    // 每一纵列的项目信息
    const infosDividedByCols = itemInfos.reduce((acc, cur) => {
      const curCol = cur.colId;
      acc[curCol] = acc[curCol].concat(cur);
      return acc;
    }, [...Array(colNum)].fill([]));
    setInfosDividedByCols(infosDividedByCols);
  }, [wrapperRef, w, itemWidth, colNum, g, gapY, itemsData]);

  /**
   * 指定 item 设置偏移
   * @param {Array} itemsMapAry 
   * 形如
   * [[id1, offset1],
   * [id2, offset2],
   * [id3, offset3]]
   */
  const setItemOffsetYs = (itemsMapAry) => {
    const offsetMap = new Map(itemsMapAry);
    setItemInfos(itemInfos => {
      return itemInfos.map(item => {
        const offsetY = offsetMap.get(item.id) == null ? item.offsetY : offsetMap.get(item.id);
        return {
          ...item,
          offsetY,
        };
      });
    });
  };
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
          className={`${styles.item} ${item.id === selectedItem ? styles.selected : ''}`}
          style={{
            position: "absolute",
            transform: `translateY(${item.offsetY}px)`,
            left: `${item.left}px`,
            top: `${item.top}px`,
            width: `${itemWidth}px`,
          }}>
          <ItemComp
            {...item.data}
            info={item} // 项目数据
            colId={item.colId} // 项目所处的纵列
            selected={selectedItem === item.id} // 项目是否被选中
            selectedItem={selectedItem} // 被选中的项目 id
            setItemOffsetYs={setItemOffsetYs} // 设置项目的纵向偏移
            itemsDividedByCols={infosDividedByCols} // 按纵列分的项目数据
            itemInfos={itemInfos} // 所有项目数据
            deselect={() => setSelectedItem(null)} // 取消选中函数
            select={id => setSelectedItem(id)} // 选中函数
            placeH={placeHeight} // 详情区域的高度
            gapY={gapY} // 纵向的项目间的间隔
            gapX={gapX} // 横向的项目间的间隔
            setPlaceTop={setPlaceTop} // 设置详情区域距离顶端的距离
            setPlaceData={setPlaceData} // 设置详情区域的数据
            originH={h2} // 原始容器的高度
            setH={setH} // 设置容器的高度
          />
        </div>
      </Fragment>)}
      {! disabledPlace && selectedItem != null && <>
        <div
          className={styles.placeholder}
          style={{
            top: `${placeT}px`,
            height: `${placeHeight}px`,
          }}>
          <Outlet context={[placeData]} />
        </div>
      </>}
    </div>
  </>);
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