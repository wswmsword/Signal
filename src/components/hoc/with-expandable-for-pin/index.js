import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function withExpandableForPin(WrappedComponent) {
  return function CompWithExpandableForPin(props) {
    const { setItemOffsetYs, itemsDividedByCols, itemInfosRef, deselect, select, placeH, gapY, setPlaceTop, setPlaceData, setH, originH, ...rest } = props;
    const { msgId } = useParams();
    /**取消选中并收缩 */
    const deselecteAndCollapse = useCallback(() => {
      const itemIds = itemInfosRef.current.map(info => info.id);
      setItemOffsetYs(itemIds.map(id => [id, 0]));
      deselect();
      setH(originH);
    }, [deselect, itemInfosRef, originH, setH, setItemOffsetYs]);

    /**选中并展开 */
    const selectAndExpand = useCallback(() => {
      const info = itemInfosRef.current.find(info => info.data.id === msgId);
      if (info == null) { return ; }
      // 选中
      select(info.id);
      // 计算因为展开详情区域项目需要移动的偏移量
      const expandingOffset = calcOffset(info, itemsDividedByCols, placeH, gapY);
      const offsetYs = itemInfosRef.current.map(info => {
        const col = info.colId;
        const { positive, negative, separator } = expandingOffset[col];
        return [info.id, info.id > separator ? positive : -negative];
      })
      setItemOffsetYs(offsetYs);
      // 设置详情区域距离顶部的距离
      setPlaceTop(info.top + info.height + gapY);
      // 设置展开后的容器高度
      setH(h => originH +  placeH + gapY);
    }, [gapY, itemInfosRef, itemsDividedByCols, msgId, originH, placeH, select, setH, setItemOffsetYs, setPlaceTop]);

    useEffect(() => {
      if (msgId) {
        selectAndExpand();
      } else {
        deselecteAndCollapse();
      }
      return () => { /* unmount */ }
    }, [deselecteAndCollapse, msgId, selectAndExpand]);

    return <>
      <WrappedComponent {...rest} />
    </>;
  };
};


/**计算每一纵列因为展开而需要移动的偏移量 */
function calcOffset(info, itemsDividedByCols, placeH, gapY) {
  const baseBottom = info.top + info.height
  return itemsDividedByCols.reduce((acc, colInfos) => {
    const len = colInfos.length;
    let separator = 0;
    let negative = 0;
    let positive = 0;
    for (let i = 0; i < len; ++ i) {
      const curInfo = colInfos[i];
      const curBottom = curInfo.top + curInfo.height
      if (curBottom >= baseBottom) {
        separator = colInfos[i].id;
        negative = curBottom - baseBottom;
        positive = placeH - negative + gapY;
        break;
      }
    }
    acc = acc.concat({
      separator, // 分隔点
      negative, // 向上偏移距离
      positive, // 向下偏移距离
    });
    return acc;
  }, []);
}