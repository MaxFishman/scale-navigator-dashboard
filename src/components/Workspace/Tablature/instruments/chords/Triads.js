import React from "react";
import "./Triads.scss";
import TabContainer from "../../TabContainer";

export default function Triads({ keyData, onClose }) {
  return (
    <TabContainer onClose={onClose}>
      <span className="triadtabs">{keyData.chords.join(", ")}</span>
    </TabContainer>
  );
}
