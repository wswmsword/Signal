import useMedia from "./useMedia";

export default function useMobile() {
  const isMobileSize = useMedia(["(min-width: 540px)"], [false], true);
  return isMobileSize;
}