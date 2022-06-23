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
import withExpandableForPin from "../../hoc/with-expandable-for-pin";
import FakeBar from "./fake-bar";
import { Outlet } from "react-router-dom";
import React from "react";

type collectionInfo = {
  id: number;
  title: string;
  titleImg: any;
  desc: string;
  state: number;
  first: {
      id: number;
      name: string;
      avatar: string;
  };
  postsNum: string;
  keyIdx: number;
  members: {
      id: number;
      name: string;
      avatar: string;
  }[];
};

/**收藏集 */
const Collection = () => {
  const { id } = useParams();
  const [ info, setInfo ] = useState<collectionInfo | null>(null);
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [id]);

  const openEditorLayer = useCallback(() => {
    setOpenedEditor(true);
  }, []);

  const closeEditorLayer = useCallback(() => {
    setOpenedEditor(false);
  }, []);

  // const memoItemsData = useMemo(() => [...Array(25)].map((_, i) => ({ id: genIdChars(), h: random(69, 361) })), []);
  const [itemsData, setData] = useState([...Array(25)].map((_, i) => ({ id: genIdChars(), h: random(69, 361) })));
  const OutletWithExpandableForPin = useMemo(() => withExpandableForPin(Outlet), []);
  const loadMore = useCallback(() => {
    const nextData = [...Array(25)].map((_, i) => ({ id: genIdChars(), h: random(69, 361) }));
    setData(v => v.concat(nextData));
  }, []);

  if (requesting) {
    return <div>Fetching the data, please wait ...</div>;
  }
  return <>
    <div className={styles.collection_wrapper}>
      <div className={styles.profile}>
        <div className={styles.profile_left}>
          <div className={styles.collection_img_wrapper}>
            {info && <img className={styles.collection_img} src={info.titleImg} alt={info.title} />}
          </div>
          <div className={styles.title_desc}>
            <div className={styles.title_wrapper}>
              <h1 className={`${styles.title} ellipsis-1`}>{info && info.title}</h1>
              <BtnBorder size="" onClick={openEditorLayer} style={{ flexShrink: 0 }}>编辑</BtnBorder>
            </div>
            <ExpandableText lineClamp={5}>{info && info.desc}</ExpandableText>
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
          ItemComp={GreyPinItem}
          PlaceComp={OutletWithExpandableForPin}
          placeHeight={521} />
      </div>
    </div>
    {info && <PopoverEditor opened={openedEditor} title={info.title} close={closeEditorLayer} intro={info.desc} />}
    <div style={{
      height: "99px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <BtnBorder onClick={loadMore}>More</BtnBorder>
    </div>
  </>;
};

export default Collection;