import React from "react";
import "./Tablature.scss";

export default function TabContainer({
  onClose,
  className,
  instrumentName,
  children,
}) {
  return (
    <li className={"tabcontainer " + className}>
      <h2 class="tabcontainer__title">{instrumentName}</h2>
      <button aria-label="Close" onClick={onClose} class="tabcontainer__close">
        X
      </button>
      {children}
    </li>
  );
}
