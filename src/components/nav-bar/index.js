
import styles from "./index.module.css";
import BtnNormal from "../btn-normal";
import BtnTrig from "../btn-trigger";
import BtnDots from "../btn-dots";
import { useState } from "react";
import MediaPanel from "../media-panel";
import useMobile from "../../hooks/useMobile";

/**
 * 顶部导航栏组件
 */
const NavBar = props => {

  const isLogin = true;
  // 创建
  const [openedNewFunc, setOpenedNewFunc] = useState(false);
  // 更多
  const [openedMore, setOpenedMore] = useState(false);
  // 更多（移动端）
  const [openedMoreMobile, setOpenedMoreMobile] = useState(false);
  // 是否是手机尺寸
  const isMobile = useMobile();

  const switchNewFunc = () => {
    setOpenedNewFunc(v => !v);
  };

  const switchMore = () => {
    setOpenedMore(v => !v);
  };

  const switchMoreMobile = () => {
    setOpenedMoreMobile(v => !v);
  };

  return <nav className={styles.nav_bar_wrapper}>
    <div className={`${styles.nav_left} ${styles.icon}`}>Signal</div>
    <ul className={`${styles.nav_middle} ${styles.nav_items}`}>
      {isLogin && <li className={`${styles.nav_item}`}>
        <BtnNormal colorType="dark">收藏集</BtnNormal>
      </li>}
      <li className={`${styles.nav_item}`}>
        <BtnNormal colorType="dark">最新</BtnNormal>
      </li>
      <li className={`${styles.nav_item}`}>
        <BtnNormal colorType="dark">速写</BtnNormal>
      </li>
    </ul>
    <ul className={`${styles.nav_right} ${styles.nav_menu}`}>
      {! isMobile && <>
        {isLogin && <li className={styles.menu_item}>
          <BtnTrig selected={openedNewFunc} onClick={switchNewFunc}>创建</BtnTrig>
          <MediaPanel opened={openedNewFunc} close={switchNewFunc} title={"创建"} childProps={{ openedNewFunc }} ChildComp={NewFuncsList} />
        </li>}
        <li className={`${styles.btn_more_wrapper} ${styles.menu_item}`}>
          <BtnDots selected={openedMore} onClick={switchMore} />
          <MediaPanel opened={openedMore} close={switchMore} title={"更多"} childProps={{ openedMore }} ChildComp={MoreList} />
        </li>
      </>}
      { isMobile && <>
        <li className={`${styles.btn_more_wrapper} ${styles.menu_item}`}>
          <BtnDots selected={openedMoreMobile} onClick={switchMoreMobile} />
          <MediaPanel opened={openedMoreMobile} close={switchMoreMobile} title={"更多"} childProps={{ openedMoreMobile }} ChildComp={MoreListMobile} />
        </li>
      </>}
    </ul>
  </nav>;
};

/**
 * 顶栏更多功能组件（移动端）
 * @param {Boolean} inPortal 是否在 Portal 中
 */
function MoreListMobile({ inPortal }) {
  return <>
    <ul className={inPortal ? styles.mobile : ''}>
      <li className={styles.func_item}><BtnNormal>创建消息</BtnNormal></li>
      <li className={styles.func_item}><BtnNormal>记速写</BtnNormal></li>
      <hr className={styles.panel_hr} />
      <li className={styles.more_item}><BtnNormal>个人主页</BtnNormal></li>
      <li className={styles.more_item}><BtnNormal>设置</BtnNormal></li>
      <li className={styles.more_item}><BtnNormal>退出账户</BtnNormal></li>
    </ul>
  </>;
}

/**
 * 顶栏更多功能组件
 * @param {Boolean} inPortal 是否在 Portal 中
 */
function MoreList({ inPortal }) {
  return <>
    <ul className={inPortal ? styles.mobile : ''}>
      <li className={styles.more_item}><BtnNormal>个人主页</BtnNormal></li>
      <li className={styles.more_item}><BtnNormal>设置</BtnNormal></li>
      <li className={styles.more_item}><BtnNormal>退出账户</BtnNormal></li>
    </ul>
  </>;
}

/**
 * 顶栏创建功能组件
 * @param {Boolean} inPortal 是否在 Portal 中
 */
function NewFuncsList({ inPortal }) {
  return <>
    <ul className={inPortal ? styles.mobile : ''}>
      <li className={styles.func_item}><BtnNormal>创建消息</BtnNormal></li>
      <li className={styles.func_item}><BtnNormal>记速写</BtnNormal></li>
    </ul>
  </>;
}

export default NavBar;