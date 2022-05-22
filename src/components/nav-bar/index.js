
import styles from "./index.module.css";
import pListStyles from "./panel-list.module.css";
import BtnPure from "../btn-pure";
import CollectionList from "./collection-list";
import { useState } from "react";
import MediaPanel from "../media-panel";
import useMobile from "../../hooks/useMobile";
import PaddingLink from "../link/padding-link";
import PaddingTriggerBtn from "../button/padding-trigger-btn";
import PaddingDotsBtn from "../button/padding-dots-btn";

/**
 * 顶部导航栏组件
 */
const NavBar = props => {

  const isLogin = true;
  // 收藏集
  const [openedCollection, setOpenedCollection] = useState(false);
  // 创建
  const [openedNewFunc, setOpenedNewFunc] = useState(false);
  // 更多
  const [openedMore, setOpenedMore] = useState(false);
  // 更多（移动端）
  const [openedMoreMobile, setOpenedMoreMobile] = useState(false);
  // 是否是手机尺寸
  const isMobile = useMobile();

  const switchCollection = () => {
    setOpenedCollection(v => !v);
  };

  const switchNewFunc = () => {
    setOpenedNewFunc(v => !v);
  };

  const switchMore = () => {
    setOpenedMore(v => !v);
  };

  const switchMoreMobile = () => {
    setOpenedMoreMobile(v => !v);
  };

  return <header className={`${styles.nav_bar_wrapper} ${isMobile ? styles.mobile : ''}`}>
    <div className={`${styles.nav_left} ${styles.icon}`}>
      {/* <div className={styles.tomato}>🍅</div> */}
      <div className={styles.icon_txt}>Sig<span className={styles.seek}>n</span>al⚡️</div>
    </div>
    <nav className={styles.nav_middle}>
      {isLogin && <>
        <PaddingTriggerBtn selected={openedCollection} onClick={switchCollection} colorType="coal" rowPadding="7">收藏集</PaddingTriggerBtn>
        <MediaPanel opened={openedCollection} close={switchCollection} title={"收藏集"} attachedRowPos="left" attachedColPos="bottom" childProps={{ openedCollection, switchCollection }} ChildComp={CollectionList} />
      </>}
      <PaddingLink to="rooms" theme="dark" rowPadding="7">房间</PaddingLink>
      <PaddingLink to="" theme="dark" rowPadding="7">最新</PaddingLink>
      <PaddingLink to="drafts" theme="dark" rowPadding="7">速写</PaddingLink>
    </nav>
    <ul className={`${styles.nav_right} ${styles.nav_menu}`}>
      {! isMobile && <>
        {isLogin && <li className={styles.menu_item}>
          <PaddingTriggerBtn selected={openedNewFunc} onClick={switchNewFunc} rowPadding="7">创建</PaddingTriggerBtn>
          <MediaPanel opened={openedNewFunc} close={switchNewFunc} title={"创建"} childProps={{ openedNewFunc }} ChildComp={NewFuncsList} />
        </li>}
        <li className={`${styles.btn_more_wrapper} ${styles.menu_item}`}>
          <PaddingDotsBtn selected={openedMore} onClick={switchMore} rowPadding="7" />
          <MediaPanel opened={openedMore} close={switchMore} title={"更多"} childProps={{ openedMore }} ChildComp={MoreList} />
        </li>
      </>}
      { isMobile && <>
        <li className={`${styles.btn_more_wrapper} ${styles.menu_item}`}>
          <PaddingDotsBtn selected={openedMoreMobile} onClick={switchMoreMobile} rowPadding="7" />
          <MediaPanel opened={openedMoreMobile} close={switchMoreMobile} title={"更多"} childProps={{ openedMoreMobile }} ChildComp={MoreListMobile} />
        </li>
      </>}
    </ul>
  </header>;
};

/**
 * 顶栏更多功能组件（移动端）
 * @param {Boolean} inPortal 是否在 Portal 中
 */
function MoreListMobile({ inPortal }) {
  return <>
    <ul className={inPortal ? pListStyles.mobile : ''}>
      <li className={pListStyles.list_item}><BtnPure size="stretch">创建消息</BtnPure></li>
      <li className={pListStyles.list_item}><BtnPure size="stretch">记速写</BtnPure></li>
      <hr className={pListStyles.panel_hr} />
      <li className={pListStyles.list_item}><BtnPure size="stretch">个人主页</BtnPure></li>
      <li className={pListStyles.list_item}><BtnPure size="stretch">设置</BtnPure></li>
      <li className={pListStyles.list_item}><BtnPure size="stretch">退出账户</BtnPure></li>
    </ul>
  </>;
}

/**
 * 顶栏更多功能组件
 * @param {Boolean} inPortal 是否在 Portal 中
 */
function MoreList({ inPortal }) {
  return <>
    <ul className={inPortal ? pListStyles.mobile : ''}>
      <li className={pListStyles.list_item}><BtnPure size="stretch">个人主页</BtnPure></li>
      <li className={pListStyles.list_item}><BtnPure size="stretch">设置</BtnPure></li>
      <li className={pListStyles.list_item}><BtnPure size="stretch">退出账户</BtnPure></li>
    </ul>
  </>;
}

/**
 * 顶栏创建功能组件
 * @param {Boolean} inPortal 是否在 Portal 中
 */
function NewFuncsList({ inPortal }) {
  return <>
    <ul className={inPortal ? pListStyles.mobile : ''}>
      <li className={pListStyles.list_item}><BtnPure size="stretch">创建消息</BtnPure></li>
      <li className={pListStyles.list_item}><BtnPure size="stretch">记速写</BtnPure></li>
    </ul>
  </>;
}

export default NavBar;