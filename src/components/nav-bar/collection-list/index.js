import styles from "./index.module.css";
import BtnPure from "../../btn-pure";
import BtnBorder from "../../btn-border";
import MemoPropsWrapper from "../../memo-props-wrapper";

export default function CollectionList({ inPortal }) {
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
      <BtnBorder>编辑</BtnBorder>
      <BtnBorder>新建收藏集</BtnBorder>
    </div>
  </>;
}