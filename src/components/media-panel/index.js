import useMobile from "../../hooks/useMobile";
import Panel from "../panel";
import PanelAttached from "../panel-attached";
import Popover from "../popover/index.js";
import PopoverPanel from "../popover-panel";

const MediaPanel = props => {
  const { title, opened, close, ChildComp, childProps, attachedRowPos, attachedColPos } = props;
  const isMobileSize = useMobile();

  return <>
    {isMobileSize ?
      <PopoverPanel title={title} opened={opened} close={close}>
        <ChildComp inPortal={true} {...childProps} />
      </PopoverPanel> :
      <PanelAttached opened={opened} rowPos={attachedRowPos} colPos={attachedColPos}>
        <ChildComp {...childProps} />
      </PanelAttached>}
  </>
};

export default MediaPanel;