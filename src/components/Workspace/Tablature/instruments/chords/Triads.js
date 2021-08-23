import React from "react";
import "./Triads.scss";

export default function Triads({ keyData }) {
  return <span className="triadtabs">{keyData.chords.join(", ")}</span>;
}
