import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getCollectionInfoById from "../../../fakes/collection-infos";
import styles from "./index.module.css";
import { random } from "../../../tools/number";
import ExpandableText from "../../expandable-text";

/**收藏集 */
const Collection = () => {
  let { id } = useParams();
  const [ info, setInfo ] = useState({});
  // 是否获取到数据
  const [ requesting, setRequesting ] = useState(false);
  const [ fakeBarWidths, setFakeBarWidths ] = useState([]);
  useEffect(() => {
    getInfo();
    async function getInfo() {
      setRequesting(true);
      const res = await getCollectionInfoById(id);
      setInfo(res);
      setFakeBarWidths([...Array(5)].map(_ => random(15, 92)));
      setRequesting(false);
    }
    return () => {}
  }, [id]);

  const randomBarSize = () => {
    setFakeBarWidths([...Array(5)].map(_ => random(15, 92)));
  };

  if (requesting) {
    return <div>Fetching the data, please wait ...</div>;
  }

  return <>
    <div className={styles.collection_wrapper}>
      <div className={styles.profile}>
        <div className={styles.profile_left}>
          <div className={styles.collection_img_wrapper}>
            <img className={styles.collection_img} src={info.titleImg} />
          </div>
          <div className={styles.title_desc}>
            <h1 className={`${styles.title} ellipsis-1`}>{info.title}</h1>
            <ExpandableText lineClamp={5}>{info.desc}</ExpandableText>
          </div>
        </div>
        <div className={styles.profile_right}>
          <div className={styles.grey_block} onClick={randomBarSize}>
            {fakeBarWidths.map((n, i) => <Fragment key={i}>
              <div className={styles.grey_bar} style={{ width: n + '%' }}></div>
            </Fragment>)}
          </div>
        </div>
      </div>
      <div className={styles.content}>

      </div>
    </div>
  </>;
}

export default Collection;