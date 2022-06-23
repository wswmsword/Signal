import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Overlay from "../../overlay";
import { getImageById } from "./images";

export default function Modal() {
  const navigate = useNavigate();
  const { id } = useParams<"id">();
  const image = getImageById(Number(id));
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  function onDismiss() {
    navigate(-1);
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
        <button
          style={{ display: "block" }}
          ref={buttonRef}
          onClick={onDismiss}
        >
            Close
        </button>
      </div>
    </Overlay>
  );
}