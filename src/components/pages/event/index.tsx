import { useCallback, useMemo, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Overlay from "../../overlay";
import { getImageById, getRandomId } from "./images";
import { MemoizedMediaPin } from "../../media-pin-layout";
import EventGreyPinItem from "../../fakes/grey-pin-item-event";
import { random, genIdChars } from "../../../tools/number";
import withExpandableForPin from "../../hoc/with-expandable-for-pin";
import BtnBorder from "../../btn-border";

interface bgState {
  backgroundLocation?: Record<string, unknown>;
}

export default function Modal() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<"id">();
  const image = getImageById(Number(id));
  const [itemsData, setData] = useState([...Array(25)].map((_, i) => ({
    id: genIdChars(),
    h: random(69, 361),
    event: false,
    eventImgId: getRandomId(),
  })));
  const OutletWithExpandableForPin = useMemo(() => withExpandableForPin(Outlet), []);
  const loadMore = useCallback(() => {
    const nextData = [...Array(25)].map((_, i) => ({
      id: genIdChars(),
      h: random(69, 361),
      event: false,
      eventImgId: getRandomId(),
    }));
    setData(v => v.concat(nextData));
  }, []);
  
  function onDismiss() {
    const locationState = location.state as bgState;
    const bgLocation = locationState.backgroundLocation;
    if (bgLocation) {
      const pathname = (bgLocation.pathname || '/') as string;
      navigate(pathname);
    } else {
      navigate('/');
    }
  }
  
  if (!image) return null;
  
  const close = () => { onDismiss(); };

  return (
    <Overlay opened={true} close={close} antiTouch>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          padding: "8px 8px",
        }}
      >
        <h1 id="label" style={{ margin: 0 }}>
          {image.title}
        </h1>
        <img
          style={{
            margin: "16px 0",
            borderRadius: "8px",
            width: "100%",
            height: "auto",
          }}
          width={400}
          height={400}
          src={image.src}
          alt=""
        />
      </div>
      <MemoizedMediaPin
        mGap={12}
        gap={36}
        mItemW={180}
        itemW={210}
        itemsData={itemsData}
        ItemComp={EventGreyPinItem}
        PlaceComp={OutletWithExpandableForPin}
        placeHeight={521} />
      <div style={{
        height: "99px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <BtnBorder onClick={loadMore}>More</BtnBorder>
      </div>
    </Overlay>
  );
}