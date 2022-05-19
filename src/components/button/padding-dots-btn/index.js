import DotsBtn from "../dots-btn";

export default function PaddingDotsBtn(props) {
  const {rowPadding} = props;
  return <DotsBtn {...props} style={{
    ...props.style,
    height: "100%",
    padding: `0 ${rowPadding || 0}px`,
  }} />
}