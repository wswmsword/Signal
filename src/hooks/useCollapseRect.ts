// source: https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
import { MutableRefObject, useCallback, useEffect, useState } from "react";

const useEffectInEvent = (
  event: "resize" | "scroll" | "click",
  set: () => void,
  collapsed: boolean,
  useCapture?: boolean
) => {
  useEffect(() => {
    if (collapsed) {
      window.removeEventListener(event, set, useCapture);
    } else {
      set();
      window.addEventListener(event, set, useCapture);
    }
    return () => window.removeEventListener(event, set, useCapture);
  }, [collapsed]);
};

const useCollapseRect = <T extends Element>(ref: MutableRefObject<T | null>, collapsed: boolean): DOMRect | undefined => {
  const [rect, setRect] = useState<DOMRect | undefined>(ref.current?.getBoundingClientRect());
  const set = useCallback(() => {
    setRect(ref.current?.getBoundingClientRect());
  }, [ref]);
  useEffectInEvent("resize", set, collapsed);
  useEffectInEvent("scroll", set, collapsed, true);
  useEffectInEvent("click", set, collapsed);
  return rect;
};

export default useCollapseRect;