/**
 * 属性缓存组件
 * @param {Function} WrappedComp 被包裹的组件
 * @param {Object} wrappedProps 被包裹组件的属性 props
 * @returns 有属性缓存的新组件
 */
const MemoPropsWrapper = ({WrappedComp, wrappedProps}) => {
  return props => <>
    <WrappedComp {...wrappedProps}>
      {props.children}
    </WrappedComp>
  </>
};

export default MemoPropsWrapper;