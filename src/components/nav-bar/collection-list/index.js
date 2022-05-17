import styles from "./index.module.css";
import BtnPure from "../../btn-pure";
import BtnBorder from "../../btn-border";
import MemoPropsWrapper from "../../memo-props-wrapper";
import PopoverPanel from "../../popover-panel";
import InputShadow from "../../input-shadow";
import React, { useState } from "react";

export default function CollectionList({ inPortal, switchCollection }) {
  const [collectionList] = useState([{
    id: 1,
    title: '想去的地方',
  }, {
    id: 2,
    title: '中文歌',
  }, {
    id: 3,
    title: '绘画技巧',
  }, {
    id: 4,
    title: '算法',
  }, {
    id: 5,
    title: '开发',
  }])
  // 新建收藏集弹窗
  const [openedNewFunc, setOpenedNewFunc] = useState(false);

  const switchNewFunc = () => {
    setOpenedNewFunc(v => !v);
  };

  const newCollection = () => {
    console.log("新建收藏集");
  };

  const pureBtnStyles = {
    width: "100%",
    height: "33px",
    textAlign: "left",
  };
  const pureBtnStylesMobile = {
    padding: "0 15px",
    width: "100%",
    height: "33px",
    textAlign: "left",
  }
  const btnProps = inPortal ? {
    customStyles: pureBtnStylesMobile,
  } : {
    customStyles: pureBtnStyles,
  }
  const BtnMemoizedStyles = MemoPropsWrapper({ WrappedComp: BtnPure, wrappedProps: btnProps });
  return <>
    <ul className={`${inPortal ? styles.mobile : ''} ${styles.list_wrapper}`}>
      {collectionList.map(collection => <React.Fragment key={collection.id}>
        <li className={styles.list_item}>
          <BtnMemoizedStyles>{collection.title}</BtnMemoizedStyles>
        </li>
      </React.Fragment>)}
    </ul>
    {/* 第二层弹窗，在移动设备上隐藏 */}
    {! inPortal && <div className={`${inPortal ? styles.mobile : ''} ${styles.funcs_wrapper}`}>
      <div className={styles.func_item}><BtnBorder size="stretch" onClick={switchNewFunc}>新建收藏集</BtnBorder></div>
      <PopoverPanel title="新建收藏集" opened={openedNewFunc} close={switchNewFunc} antiTouch={true}>
        <div className={styles.input_wrapper}>
          <InputShadow />
        </div>
        <div className={styles.col_funcs_wrapper}>
          <div className={styles.col_func}><BtnBorder size="stretch" onClick={switchNewFunc}>取消</BtnBorder></div>
          <div className={styles.col_func}><BtnBorder size="stretch" onClick={newCollection}>新建</BtnBorder></div>
        </div>
      </PopoverPanel>
    </div>}
  </>;
}