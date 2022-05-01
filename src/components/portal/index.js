// import { useEffect } from "react";
import { createPortal } from "react-dom";

const portalRoot = document.getElementById("portal");

const Portal = ({ children }) => {
  // const node = document.createElement("div");

  // useEffect(() => {
  //   if (portalRoot && node) {
  //     portalRoot.appendChild(node);
  //   }
  //   return () => {
  //     console.log('clean ..')
  //     if (portalRoot && node) {
  //       portalRoot.removeChild(node);
  //     }
  //   };
  // }, [node]);

  return portalRoot ? createPortal(children, portalRoot) : null;
};


export default Portal;
