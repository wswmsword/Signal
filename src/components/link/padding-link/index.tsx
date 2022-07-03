import * as React from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.css";

const PaddingLink = React.forwardRef(
  ({ activeClassName, activeStyle, rowPadding, theme, ...props }: any, ref) => {
    const themeClass = theme === "dark" ? styles.dark : styles.light;
    return (
      <NavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [
            props.className,
            isActive ? activeClassName : null,
            styles.normal,
            isActive ? styles.active : null,
            themeClass,
          ]
            .filter(Boolean)
            .join(" ")
        }
        style={({ isActive }) => ({
          ...props.style,
          ...(isActive ? activeStyle : null),
          padding: `0 ${rowPadding}px`,
        })}
      />
    );
  }
);

PaddingLink.displayName = "PaddingLink";

export default PaddingLink;