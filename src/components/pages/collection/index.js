import { Fragment, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import getCollectionInfoById from "../../../fakes/collection-infos";
import styles from "./index.module.css";
import { random } from "../../../tools/number";
import ExpandableText from "../../expandable-text";
import BtnBorder from "../../btn-border";
import PopoverEditor from "./popover-editor";
import MediaPin from "../../media-pin-layout";
import GreyPinItem from "../../fakes/grey-pin-item";
import withExpandableLayerForPin from "../../hoc/with-expandable-layer-for-pin";
import FakeBar from "./fake-bar";

/**收藏集 */
const Collection = () => {
  let { id } = useParams();
  const [ info, setInfo ] = useState({});
  const [ requesting, setRequesting ] = useState(false); // 是否获取到数据
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

  const openEditorLayer = () => {
    setOpenedEditor(true);
  };

  const closeEditorLayer = () => {
    setOpenedEditor(false);
  };

  const itemsData = useMemo(() => [...Array(25)].map((_, i) => ({ h: random(69, 361) })), []);
  const GreyPinItemWithExpandableLayerForPin = useMemo(() => withExpandableLayerForPin(GreyPinItem), []);

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
        <MediaPin
          mGap={12}
          gap={36}
          mItemW={180}
          itemW={210}
          itemsData={itemsData}
          ItemComp={GreyPinItemWithExpandableLayerForPin} />
      </div>
    </div>
    <PopoverEditor opened={openedEditor} title={info.title} close={closeEditorLayer} intro={info.desc} />
  </>;
}

export default Collection;