import Popover from "../popover";
import Panel from "../panel";

/**
 * 弹窗嵌板组件
 */
const PopoverPanel = props => {
  const { title, opened, close, antiTouch } = props;
  return <>
    <Popover opened={opened} close={close} antiTouch={antiTouch}>
      <Panel title={title} opened={opened} close={close}>
        {props.children}
      </Panel>
    </Popover>
  </>;
};

export default PopoverPanel;