import React from "react";

export default function Note({ children, className, note, x, y }) {
  return (
    <>
      <circle
        cx={x}
        cy={y}
        r="20"
        className={className}
      />
      <text dy="0.3em" x={x} y={y} className={note || ""}>
        {children}
      </text>
    </>
  );
}
