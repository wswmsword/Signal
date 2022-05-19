import TriggerBtn from "../trigger-btn";

export default function PaddingTriggerBtn(props) {
  const {rowPadding} = props;
  return <>
    <TriggerBtn
      {...props}
      style={{
        ...props.style,
        height: "100%",
        padding: `0 ${rowPadding || 0}px`
      }} />
  </>
}