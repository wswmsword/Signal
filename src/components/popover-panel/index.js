import Popover from "../popover";
import Panel from "../panel";
import { useEffect, useState } from "react";

/**
 * 弹窗嵌板组件
 */
const PopoverPanel = props => {
  const { title, opened, close, antiTouch } = props;
  // 嵌套的 CSSTransition 导致子组件动画失效，这里延迟子组件挂载使动画生效
  const [ delay, setDelay ] = useState(false);

  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        setDelay(true)
      }, 0)
    } else {
      setDelay(false)
    }
  }, [opened])
  return <>
    <Popover opened={opened} close={close} antiTouch={antiTouch}>
      <Panel title={title} opened={opened && delay} close={close}>
        {props.children}
      </Panel>
    </Popover>
  </>;
};

export default PopoverPanel;