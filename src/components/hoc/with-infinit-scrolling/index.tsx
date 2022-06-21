import React, { useCallback } from "react";

const withInfinitScrolling = (WrappedComp: React.ComponentType) => {
  return function CompWithInfinitScrolling(props: any) {
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

    }, [])
    return <WrappedComp {...props} />
  };
};

export default withInfinitScrolling;