import { useCallback, useRef, useEffect } from "react";

/**
 * Intersection Observer configuratiopn options.
 */
 interface IntersectionObserverOptions {

  /**
   * Number from 0 to 1 representing the percentage
   * of the element that needs to be visible to be
   * considered as visible. Can also be an array of
   * thresholds.
   */
  threshold: number | number[]

  /**
   * Element that is used as the viewport for checking visibility
   * of the provided `ref` or `element`.
   */
  root?: Element | null,

  /**
   * Margin around the root. Can have values similar to
   * the CSS margin property.
   */
  rootMargin?: string
}

interface InfinitScrollingProps {
  onReachBottom: () => void;
  options?: IntersectionObserverOptions,
}

interface disabledIS {
  disabledIS?: boolean,
}

/**无限滚动高阶组件 */
function withInfinitScrolling<T>(WrappedComp: React.ComponentType<T>, {
  onReachBottom,
  options =  {
    root: null,
    rootMargin: "20px",
    threshold: 0
  },
}: InfinitScrollingProps) {
  const { root, rootMargin, threshold } = options;
  return function CompWithInfinitScrolling(props: T & disabledIS) {
    const { disabledIS } = props;
    const loader = useRef(null);
    const observer = useRef<IntersectionObserver | null>(null);
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting){
        onReachBottom();
      }
    }, []);
    useEffect(() => {
      if (disabledIS) {
        observer.current && observer.current.disconnect();
        return ;
      }
      const option = {
        root,
        rootMargin,
        threshold,
      };
      observer.current = new IntersectionObserver(handleObserver, option);
      if (loader.current) observer.current.observe(loader.current);
      return () => {
        observer.current && observer.current.disconnect();
      };
    }, [handleObserver, disabledIS]);
    
    return <>
      <WrappedComp {...props} />
      <div ref={loader} />
    </>;
  };
}

export default withInfinitScrolling;