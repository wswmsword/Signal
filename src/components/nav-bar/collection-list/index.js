import styles from "./index.module.css";

import BtnBorder from "../../btn-border";
import PopoverPanel from "../../popover-panel";
import InputShadow from "../../input-shadow";
import React, { useState } from "react";
import FullLink from "../../link/full-link";
import collections_fk from "../../../../src/fakes/collections";

export default function CollectionList({ inPortal, switchCollection }) {
  const [collectionList] = useState(collections_fk);
  // 新建收藏集弹窗
  const [openedNewFunc, setOpenedNewFunc] = useState(false);

  const switchNewFunc = () => {
    setOpenedNewFunc(v => !v);
  };

  const newCollection = () => {
    console.log("新建收藏集");
  };

  return <>
    <ul className={`${inPortal ? styles.mobile : ''} ${styles.list_wrapper}`}>
      {collectionList.map(collection => <React.Fragment key={collection.id}>
        <li className={styles.list_item}>
          <FullLink to={"collections/" + collection.id} theme="lignt">{collection.title}</FullLink>
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