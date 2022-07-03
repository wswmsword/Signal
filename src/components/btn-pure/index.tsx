import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import styles from "./index.module.css";

const COLOR_LIGHT = 'light';
const COLOR_DARK = 'dark';

const SIZE_STRETCH = 'stretch';

type colorType = "light" | "dark";
type size = "stretch";

interface BtnPrps {
  colorType?: colorType;
  size?: size;
  customStyles?: CSSProperties;
  selected?: boolean;
  onClick?: MouseEventHandler;
  children: ReactNode;
}

const BtnPure = (props: BtnPrps) => {
  const { colorType, size, customStyles, selected, onClick } = props;
  const colorClass = (colorType === COLOR_DARK ? styles.dark : styles.light) || '';
  const sizeClass = (size === SIZE_STRETCH ? styles.stretch : '') || '';
  return <button
    className={`${styles.normal} ${colorClass} ${sizeClass} ${selected ? styles.selected : ''}`}
    style={customStyles}
    onClick={onClick}>
    {props.children}
  </button>;
};

export default BtnPure;