
import styles from "./index.module.css";
import BtnNormal from "../btn-normal";
import BtnTrig from "../btn-trigger";
import BtnDots from "../btn-dots";
import { useState } from "react";

const NavBar = props => {

  const isLogin = true;
  const [openedNewFunc, setOpenedNewFunc] = useState(false);

  const switchNewFunc = () => {
    setOpenedNewFunc(v => !v);
  };

  return <nav className={styles.nav_bar_wrapper}>
    <div className={`${styles.nav_left} ${styles.icon}`}>Signal</div>
    <ul className={`${styles.nav_middle} ${styles.nav_items}`}>
      {isLogin && <li className={`${styles.nav_item}`}>
        <BtnNormal>收藏集</BtnNormal>
      </li>}
      <li className={`${styles.nav_item}`}>
        <BtnNormal>最新</BtnNormal>
      </li>
      <li className={`${styles.nav_item}`}>
        <BtnNormal>草稿</BtnNormal>
      </li>
    </ul>
    <ul className={`${styles.nav_right} ${styles.nav_menu}`}>
      {isLogin && <li className={styles.menu_item}>
        <BtnTrig selected={openedNewFunc} onClick={switchNewFunc}>创建</BtnTrig>
        <ul className={`${styles.new_funcs_panel} ${openedNewFunc ? styles.shown_panel : ''}`}>
          <li className={styles.func_item}><BtnNormal>创建消息</BtnNormal></li>
          <li className={styles.func_item}><BtnNormal>打草稿</BtnNormal></li>
        </ul>
      </li>}
      <li className={`${styles.btn_more_wrapper} ${styles.menu_item}`}>
        <BtnDots selected={false} />
      </li>
    </ul>
  </nav>;
};

export default NavBar;