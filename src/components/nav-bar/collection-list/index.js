import styles from "./index.module.css";
import BtnPure from "../../btn-pure";
import BtnBorder from "../../btn-border";
import MemoPropsWrapper from "../../memo-props-wrapper";
import PopoverPanel from "../../popover-panel";
import InputShadow from "../../input-shadow";
import { useState } from "react";

export default function CollectionList({ inPortal, switchCollection }) {
  const [openedNewFunc, setOpenedNewFunc] = useState(false);

  const switchNewFunc = () => {
    setOpenedNewFunc(v => !v);
    switchCollection(v => !v);
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
      <li className={styles.list_item}><BtnMemoizedStyles>想去的地方</BtnMemoizedStyles></li>
      <li className={styles.list_item}><BtnMemoizedStyles>中文歌</BtnMemoizedStyles></li>
      <li className={styles.list_item}><BtnMemoizedStyles>绘画技巧</BtnMemoizedStyles></li>
      <li className={styles.list_item}><BtnMemoizedStyles>算法</BtnMemoizedStyles></li>
      <li className={styles.list_item}><BtnMemoizedStyles>开发</BtnMemoizedStyles></li>
    </ul>
    <div className={`${inPortal ? styles.mobile : ''} ${styles.funcs_wrapper}`}>
      <div className={styles.func_item}><BtnBorder size="stretch">编辑</BtnBorder></div>
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
    </div>
  </>;
}