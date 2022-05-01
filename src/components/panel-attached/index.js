import styles from "./index.module.css";

const PanelAttached = props => {
  const { opened } = props;
  return <>
    <div className={`${styles.panel_wrapper} ${opened ? styles.opened : ''}`}>
      {props.children}
    </div>
  </>;
};

export default PanelAttached;