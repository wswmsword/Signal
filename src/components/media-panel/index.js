import useMobile from "../../hooks/useMobile";
import Panel from "../panel";
import PanelAttached from "../panel-attached";
import Popover from "../popover/index.js";

const MediaPanel = props => {
  const { title, opened, close, ChildComp, childProps } = props;
  const isMobileSize = useMobile();

  return <>
    {isMobileSize ?
      <Popover opened={opened} close={close}>
        <Panel title={title} opened={opened} close={close}>
          <ChildComp inPortal={true} {...childProps} />
        </Panel>
      </Popover> :
      <PanelAttached opened={opened}>
        <ChildComp {...childProps} />
      </PanelAttached>}
  </>
};

export default MediaPanel;