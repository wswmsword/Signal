import React, { useState, useRef, useEffect, Fragment, useCallback } from "react";
import styles from "./index.module.css";

interface PinProps {
  width?: number,
  itemWidth: number,
  colNum: number,
  gapX?: number,
  gapY?: number,
  placeHeight?: number,
  itemsData: object[],
  ItemComp?: React.ComponentType<any>,
  PlaceComp?: React.ComponentType<any>,
}

interface itemInfo {
  id: number,
  top: number,
  left: number,
  height: number,
  colId: number,
  offsetY: number,
  data: object,
}

/**
 * 砖块布局组件
 * 
 * 设置宽度，子项目将均匀布局在宽度中；设置左右间隔，子项目将按间隔
 * 布局，宽度即子项目间隔后的宽度。
 */
function PinLayout({ width, itemWidth, colNum, gapX = 36, gapY = 36, placeHeight = 521, ItemComp, itemsData = [], PlaceComp }: PinProps) {
  // 容器宽度
  const [w, setW] = useState(0);
  // 容器高度
  const [h, setH] = useState(0);
  // 容器的初始高度
  const [h2, setH2] = useState(0);
  // 项目横向间隔
  const [g, setG] = useState(0);
  // top, left, ItemComp，项目信息
  const [itemInfos, setItemInfos] = useState<itemInfo[]>([]);
  const itemInfosRef = useRef<itemInfo[]>(itemInfos);
  // 每一纵列由上至下的项目信息
  const [infosDividedByCols, setInfosDividedByCols] = useState<itemInfo[][]>([]);
  // 选中的项目 id
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  // const [placeholderTop, setPlaceholderTop] = useState(0);
  // 详情区域距离顶部的距离
  const [placeT, setPlaceTop] = useState(0);
  const [placeData, setPlaceData] = useState({ init: "bird" });
  // 加载完成的项目数量
  const [loadedItems, setLoaded] = useState<Array<boolean | undefined>>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [hasMoveAnime, setHasMoveAnime] = useState(false);

  useEffect(() => {
    // 子项目数目
    const itemsLen = itemsData.length;
    setItemInfos(v => {
      const prevLen = v.length;
      const concatedItems = v.concat([...Array(itemsLen - prevLen)].map((_, i) => ({
        id: 0,
        top: 0, // 项目顶部与容器顶部的距离
        left: 0, // 项目的左边与容器左边的距离
        height: 0, // 项目高度
        colId: 0, // 项目所在纵列
        offsetY: 0, // 项目偏移距离
        data: itemsData[prevLen + i],
      })));
      return concatedItems;
    });

    setHasMoveAnime(false);
    setTimeout(() => {
      setHasMoveAnime(true);
    }, 69);
  }, [itemsData]);

  useEffect(() => {
    // 如果提供宽度就根据宽度计算横向间隔，如果提供间隔就取间隔
    if (width == null) {
      setG(gapX || 36);
    } else {
      setG(Math.floor((width - itemWidth * colNum) / (colNum - 1)));
    }
    // 如果提供宽度就取宽度，如果提供左右间隔就使用左右间隔计算宽度
    setW(width || gapX * (colNum - 1) + itemWidth * colNum);
  }, [width, gapX, colNum, itemWidth]);

  useEffect(() => {
    // 加载完成的项目数量
    const loadedItemsLen = loadedItems.filter(b => b).length;
    // 所有项目数量
    const totalItemsLen = itemsData.length;
    if (loadedItemsLen !== totalItemsLen) { return; }
    // 子项目数目
    const itemsLen = itemsData.length;
    // 项目的高度
    const wrapperEl = wrapperRef.current;
    if (wrapperEl == null) { return; }
    const itemHs = Array.prototype.map.call<NodeListOf<ChildNode>, any, number[]>(wrapperEl.childNodes, (node: HTMLDivElement) => node.clientHeight);
    // 列的左边距离
    const colLs = [0];
    for (let i = 1; i < colNum; ++ i) {
      colLs.push(colLs[i - 1] + itemWidth + g);
    }
    // 项目的左边距离
    const itemLs: number[] = [];
    // 容器高度
    let wrapperH = 0;
    // 项目的上边距离
    const itemTs: number[] = [];
    // 每一纵列底部项目的 id
    const colBottomIds = [];
    // 项目的所在列 id
    const itemCs: number[] = [];
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
    const newItemInfos = [...Array(itemsLen)].map((_, i) => ({
      id: i,
      top: itemTs[i],
      left: itemLs[i],
      height: itemHs[i],
      colId: itemCs[i],
      offsetY: 0,
      data: itemsData[i],
    }));
    setItemInfos(newItemInfos);
    itemInfosRef.current = newItemInfos;
    // 每一纵列的项目信息
    const infosDividedByCols: itemInfo[][] = newItemInfos.reduce((acc, cur) => {
      const curCol = cur.colId;
      acc[curCol] = acc[curCol].concat(cur);
      return acc;
    }, [...Array(colNum)].fill([]));
    setInfosDividedByCols(infosDividedByCols);
  }, [wrapperRef, w, itemWidth, colNum, g, gapY, itemsData, loadedItems]);

  /**
   * 指定 item 设置偏移
   * @param {Array} itemsMapAry 
   * 形如
   * [[id1, offset1],
   * [id2, offset2],
   * [id3, offset3]]
   */
  const setItemOffsetYs = useCallback((itemsMapAry: Array<readonly [number, number]>) => {
    const offsetMap = new Map<number, number>(itemsMapAry);
    setItemInfos((itemInfos: itemInfo[]) => {
      const res = itemInfos.map((item: itemInfo) => {
        const offsetY = offsetMap.get(item.id) == null ? item.offsetY : offsetMap.get(item.id) as number;
        return {
          ...item,
          offsetY,
        };
      });
      itemInfosRef.current = res;
      return res;
    });
  }, []);

  const deselect = useCallback(() => setSelectedItem(null), []);
  const select = useCallback((id: number) => setSelectedItem(id), []);

  const setLoadedItem = useCallback((i: number) => {
    return () => {
      setLoaded(v => {
        const newV = [...v];
        newV[i] = true;
        return newV;
      });
    };
  }, []);

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
          className={`${styles.item} ${item.id === selectedItem ? styles.selected : ''} ${hasMoveAnime ? styles.move_trans : ''}`}
          style={{
            position: "absolute",
            transform: `translateY(${item.offsetY}px)`,
            left: `${item.left}px`,
            top: `${item.top}px`,
            width: `${itemWidth}px`,
          }}>
          {ItemComp && <ItemComp
            {...item.data}
            info={item} // 项目数据
            colId={item.colId} // 项目所处的纵列
            selected={selectedItem === item.id} // 项目是否被选中
            selectedItem={selectedItem} // 被选中的项目 id
            setItemOffsetYs={setItemOffsetYs} // 设置项目的纵向偏移
            itemsDividedByCols={infosDividedByCols} // 按纵列分的项目数据
            itemInfos={itemInfos} // 所有项目数据
            deselect={deselect} // 取消选中函数
            select={select} // 选中函数
            placeH={placeHeight} // 详情区域的高度
            gapY={gapY} // 纵向的项目间的间隔
            gapX={gapX} // 横向的项目间的间隔
            setPlaceTop={setPlaceTop} // 设置详情区域距离顶端的距离
            setPlaceData={setPlaceData} // 设置详情区域的数据
            originH={h2} // 原始容器的高度
            setH={setH} // 设置容器的高度
            readyToCalc={setLoadedItem(i)} // 设置项目加载完成，可以计算位置了
          />}
        </div>
      </Fragment>)}
      {PlaceComp && <>
        <div
          className={styles.placeholder}
          style={{
            top: `${placeT}px`,
            height: `${placeHeight}px`,
          }}>
          <PlaceComp
            selectedItem={selectedItem} // 被选中的项目 id
            setItemOffsetYs={setItemOffsetYs} // 设置项目的纵向偏移
            itemsDividedByCols={infosDividedByCols} // 按纵列分的项目数据
            itemInfosRef={itemInfosRef} // 所有项目数据
            deselect={deselect} // 取消选中函数
            select={select} // 选中函数
            placeH={placeHeight} // 详情区域的高度
            gapY={gapY} // 纵向的项目间的间隔
            gapX={gapX} // 横向的项目间的间隔
            setPlaceTop={setPlaceTop} // 设置详情区域距离顶端的距离
            setPlaceData={setPlaceData} // 设置详情区域的数据
            originH={h2} // 原始容器的高度
            setH={setH} // 设置容器的高度
            context={[placeData]}
          />
        </div>
      </>}
    </div>
  </>);
}

export default PinLayout;


function getMinHeight(colNum: number, colBottomIds: number[], itemTops: number[], itemHeights: number[]) {
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