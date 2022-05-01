import styles from "./index.module.css";

const Panel = props => {
  const { opened, close, title } = props;

  return <>
    <div className={`${styles.pannel_wrapper} ${opened ? styles.opened : ''}`}>
      <div className={styles.title_wrapper}>
        <div className={styles.title}>{title || "默认标题"}</div>
        <div className={styles.close_wrapper}>
          <button className={styles.btn_close} onClick={close}></button>
        </div>
      </div>
      <div className={styles.pannel_inner}>
        { props.children }
      </div>
    </div>
  </>
};

export default Panel;