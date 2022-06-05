import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import getCollectionInfoById from "../../../fakes/collection-infos";
import styles from "./index.module.css";
import { random, genIdChars } from "../../../tools/number";
import ExpandableText from "../../expandable-text";
import BtnBorder from "../../btn-border";
import PopoverEditor from "./popover-editor";
import { MemoizedMediaPin } from "../../media-pin-layout";
import GreyPinItem from "../../fakes/grey-pin-item";
import withMsgLink from "../../hoc/with-msg-link";
import withExpandableForPin from "../../hoc/with-expandable-for-pin";
import FakeBar from "./fake-bar";
import { Outlet } from "react-router-dom";

/**收藏集 */
const Collection = () => {
  let { id } = useParams();
  const [ info, setInfo ] = useState({});
  const [ requesting, setRequesting ] = useState(true); // 是否获取到数据
  const [ openedEditor, setOpenedEditor ] = useState(false);
  useEffect(() => {
    getInfo();
    async function getInfo() {
      setRequesting(true);
      const res = await getCollectionInfoById(id);
      setInfo(res);
      setRequesting(false);
    }
    return () => {}
  }, [id]);

  const openEditorLayer = useCallback(() => {
    setOpenedEditor(true);
  }, []);

  const closeEditorLayer = useCallback(() => {
    setOpenedEditor(false);
  }, []);

  const itemsData = useMemo(() => [...Array(25)].map((_, i) => ({ id: genIdChars(), h: random(69, 361) })), []);
  const GreyPinItemWithMsgNavLink = useMemo(() => withMsgLink(GreyPinItem), []);
  const OutletWithExpandableForPin = useMemo(() => withExpandableForPin(Outlet), []);
  if (requesting) {
    return <div>Fetching the data, please wait ...</div>;
  }
  return <>
    <div className={styles.collection_wrapper}>
      <div className={styles.profile}>
        <div className={styles.profile_left}>
          <div className={styles.collection_img_wrapper}>
            <img className={styles.collection_img} src={info.titleImg} alt={info.title} />
          </div>
          <div className={styles.title_desc}>
            <div className={styles.title_wrapper}>
              <h1 className={`${styles.title} ellipsis-1`}>{info.title}</h1>
              <BtnBorder size="" onClick={openEditorLayer} style={{ flexShrink: 0 }}>编辑</BtnBorder>
            </div>
            <ExpandableText lineClamp={5}>{info.desc}</ExpandableText>
          </div>
        </div>
        <div className={styles.profile_right}>
          <FakeBar />
        </div>
      </div>
      <div className={styles.content}>
        <MemoizedMediaPin
          mGap={12}
          gap={36}
          mItemW={180}
          itemW={210}
          itemsData={itemsData}
          ItemComp={GreyPinItemWithMsgNavLink}
          PlaceComp={OutletWithExpandableForPin}
          placeHeight={521} />
      </div>
    </div>
    <PopoverEditor opened={openedEditor} title={info.title} close={closeEditorLayer} intro={info.desc} />
  </>;
}

export default Collection;