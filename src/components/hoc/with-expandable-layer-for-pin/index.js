
export default function withExpandableLayerForPin(WrappedComponent) {
  return function WithAutoColumn(props) {
    const { setItemOffsetYs, itemsDividedByCols, selected, itemInfos, deselect, select, info, placeH, gapY, ...rest } = props;

    /**选中并展开 */
    const selectAndExpand = () => {
      // 如果点击已选中项目就复原
      const itemIds = itemInfos.map(info => info.id);
      if (selected) {
        setItemOffsetYs(itemIds.map(id => [id, 0]));
        deselect();
        // setH(h - panelHeight - gapY);
        return ;
      }
      select(info.id)
      const expandingOffset = calcOffset();
      const offsetYs = itemInfos.map(info => {
        const col = info.colId;
        const { positive, negative, separator } = expandingOffset[col]
        return [info.id, info.id > separator ? positive : -negative];
      })
      setItemOffsetYs(offsetYs)

      // setPlaceholderTop(itemInfo.top + itemInfo.height + gapY);
      // setH(h + panelHeight + gapY);

      /**计算每一纵列因为展开而需要移动的偏移量 */
      function calcOffset() {
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
    };

    return <div onClick={selectAndExpand}>
      <WrappedComponent
        {...rest} />
    </div>
  }
}