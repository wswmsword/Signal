import DotsBtn from "../dots-btn";

interface PDBProps {
  rowPadding?: number;
  style?: Record<string, unknown>;
  selected?: boolean;
  onClick?: () => void;
}

export default function PaddingDotsBtn(props: PDBProps) {
  const { rowPadding } = props;
  return <DotsBtn {...props} style={{
    ...props.style,
    height: "100%",
    padding: `0 ${rowPadding || 0}px`,
  }} />;
}