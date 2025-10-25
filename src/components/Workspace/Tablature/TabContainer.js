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
            <h2 className="tabcontainer__title">{instrumentName}</h2>

            {/*<label className="tabcontainer__transposition" for="transposition">transposition:</label>
      <input type="text"></input>*/}

            <button
                aria-label="Close"
                onClick={onClose}
                className="tabcontainer__close"
            >
                X
            </button>
            {children}
        </li>
    );
}
