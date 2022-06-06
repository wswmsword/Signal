// source: https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
import { MutableRefObject, useCallback, useEffect, useState } from "react";

const useEffectInEvent = (
  event: "resize" | "scroll",
  set: () => void,
  useCapture?: boolean
) => {
  useEffect(() => {
    set();
    window.addEventListener(event, set, useCapture);
    return () => window.removeEventListener(event, set, useCapture);
  }, [event, set, useCapture]);
};

export const useRect = <T extends Element>(ref: MutableRefObject<T | null>): DOMRect | undefined => {
  const [rect, setRect] = useState<DOMRect>();

  const set = useCallback(() => setRect(ref.current?.getBoundingClientRect()), [ref]);

  useEffectInEvent("resize", set);
  useEffectInEvent("scroll", set, true);

  return rect;
}