import React from "react";
import "./Tablature.scss";

export default function TabContainer({ onClose, className, children }) {
  return (
    <li className={"tabcontainer " + className}>
      <button aria-label="Close" onClick={onClose} class="tabcontainer__close">
        x
      </button>
      {children}
    </li>
  );
}
