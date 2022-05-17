import styles from "./index.module.css";
import transition from "./transition.module.css";
import { CSSTransition } from "react-transition-group";

const Panel = props => {
  const { opened, close, title } = props;

  return <CSSTransition
    in={opened}
    timeout={200}
    classNames={{
      enter: transition.panel_enter,
      enterActive: transition.panel_enter_active,
      exit: transition.panel_exit,
      exitActive: transition.panel_exit_active,
    }}
    appear={true}
    unmountOnExit>
    <div className={`${styles.pannel_wrapper}`}>
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
  </CSSTransition>
};

export default Panel;