import styles from "./index.module.css";

const PanelReadOnly = props => {
  const { opened, title } = props;

  return <>
    <div className={`${styles.pannel_wrapper} ${opened ? styles.opened : ''}`}>
      <div className={styles.title_wrapper}>
        <div className={styles.title}>{title || "默认标题"}</div>
      </div>
      <div className={styles.pannel_inner}>
        { props.children }
      </div>
    </div>
  </>
};

export default PanelReadOnly;