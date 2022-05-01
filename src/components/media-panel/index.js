import useMobile from "../../hooks/useMobile";
import Popover from "../popover/index.js";

const MediaPanel = props => {
  const { opened, close, ChildComp, childProps } = props;
  const isMobileSize = useMobile();

  return <>
    {isMobileSize ?
      <Popover opened={opened} close={close}>
        <ChildComp inPortal={true} {...childProps} />
      </Popover> :
      <ChildComp {...childProps} />}
  </>
};

export default MediaPanel;