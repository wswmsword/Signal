import { Link } from "react-router-dom";

export default function withMsgLink(WrappedComponent) {
  return function CompWithMsgLink(props) {
    const { selected, info, ...rest } = props;
    return <>
      <Link to={selected ? '' : `msgs/${info.data.id}`}>
        <WrappedComponent
          selected={selected}
          {...rest} />
      </Link>
    </>;
  };
}