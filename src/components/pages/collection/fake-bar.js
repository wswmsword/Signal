import { useEffect, useState, memo } from "react";
import { random } from "../../../tools/number";
import styles from "./grey-bar.module.css";
import { Fragment } from "react";

const FakeBar = () => {
  const [ fakeBarWidths, setFakeBarWidths ] = useState([]);
  useEffect(() => {
    setFakeBarWidths([...Array(5)].map(_ => random(15, 92)));
  }, []);
  const randomBarSize = () => {
    setFakeBarWidths([...Array(5)].map(_ => random(15, 92)));
  };
  return <div className={styles.grey_block} onClick={randomBarSize}>
  {fakeBarWidths.map((n, i) => <Fragment key={i}>
    <div className={styles.grey_bar} style={{ width: n + '%' }}></div>
  </Fragment>)}
</div>
};

export default memo(FakeBar);