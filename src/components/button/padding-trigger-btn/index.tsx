import { ReactNode } from "react";
import TriggerBtn from "../trigger-btn";

interface PTBProps {
  rowPadding?: number;
  style?: Record<string, unknown>;
  children?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  colorType?: string;
}

export default function PaddingTriggerBtn(props: PTBProps) {
  const { rowPadding } = props;
  return <>
    <TriggerBtn
      {...props}
      style={{
        ...props.style,
        height: "100%",
        padding: `0 ${rowPadding || 0}px`
      }} />
  </>;
}