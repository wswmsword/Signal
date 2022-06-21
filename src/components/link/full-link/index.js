import * as React from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.css";

const FullLink = React.forwardRef(
  ({ activeClassName, activeStyle, theme, ...props }, ref) => {
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
        })}
      />
    );
  }
);

// link: https://stackoverflow.com/a/67993106
FullLink.displayName = "FullLink";

export default FullLink;