import React, { useState } from "react";
import "App.css";
import "./Tablature.scss";
import Mandolin from "./instruments/strings/Mandolin";
import Guitar from "./instruments/strings/Guitar";
import Banjo from "./instruments/strings/Banjo";
import Ukulele from "./instruments/strings/Ukulele";
import ScaleData from "common/ScaleData";
import { ScaleContext } from "components/Context/ScaleContext";
import Flute from "./instruments/flute/Flute";
import Select from "react-select";

const INST = {
  GUITAR: {
    name: "GUITAR",
    Fn: Guitar,
  },
  BANJO: {
    name: "BANJO",
    Fn: Banjo,
  },
  MANDOLIN: {
    name: "MANDOLIN",
    Fn: Mandolin,
  },
  UKULELE: {
    name: "UKULELE",
    Fn: Ukulele,
  },
  FLUTE: {
    name: "FLUTE",
    Fn: Flute,
  },
};

export default function Tablature() {
  const [selected, setSelected] = useState([]);

  const options = [
    {
      label: "Fretted Instruments",
      options: [
        { label: "Guitar", value: INST.GUITAR.name },
        { label: "Banjo", value: INST.BANJO.name },
        { label: "Mandolin", value: INST.MANDOLIN.name },
        { label: "Ukulele", value: INST.UKULELE.name },
      ],
    },
    {
      label: "Aerophones",
      options: [{ label: "Flute", value: INST.FLUTE.name }],
    },
  ];

  const onChange = (selectedValues, s) => {
    setSelected(selectedValues);
  };

  const makeCloseFn = (name) => {
    return () => {
      const newSelected = selected.filter((s) => s.value !== name);
      setSelected(newSelected);
    };
  };
  return (
    <ScaleContext.Consumer>
      {({ scale }) => {
        const keyData = ScaleData[scale];
        return (
          <div>
            <div style={{ margin: "3vh" }}>
              <Select
                isMulti
                name="Tablature"
                onChange={onChange}
                options={options}
                value={selected}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <ol class="alltabscontainer">
              {selected.map((selection) => {
                if (INST[selection.value]) {
                  const Inst = INST[selection.value];
                  return (
                    <Inst.Fn
                      keyData={keyData}
                      onClose={makeCloseFn(Inst.name)}
                    />
                  );
                }
                return <></>;
              })}
            </ol>
          </div>
        );
      }}
    </ScaleContext.Consumer>
  );
}
