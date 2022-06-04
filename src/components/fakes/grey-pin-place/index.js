import { useOutletContext } from "react-router-dom";
import styles from "./index.module.css";
import { useParams } from "react-router-dom";

const GreyPinPlace = props => {
  // const { c } = props;
  const [placeData] = useOutletContext();
  const { signalId } = useParams()
  return <>
    <div className={styles.placeholder}>
      {placeData.init}: {signalId}
    </div>
  </>
};

export default GreyPinPlace;