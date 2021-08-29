import React, { useContext, useState } from "react";
import "./Tablature.scss";
import Mandolin from "./instruments/strings/Mandolin";
import Guitar from "./instruments/strings/Guitar";
import Banjo from "./instruments/strings/Banjo";
import Ukulele from "./instruments/strings/Ukulele";
import ScaleData from "common/ScaleData";
import { ScaleContext } from "components/Context/ScaleContext";
import Flute from "./instruments/flute/Flute";
import Select from "react-select";
import Piano from "./instruments/keyboard/Piano";
import Treble from "./instruments/notation/TrebleStaff";
import Triads from "./instruments/chords/Triads";
import TriadCircle from "./instruments/chords/TriadCircle";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Autoharp from "./instruments/autoharp/Autoharp";
import { arrayMoveImmutable } from "array-move";
import TabContainer from "./TabContainer";

const INST = {
  GUITAR: {
    name: "GUITAR",
    display: "Guitar",
    Fn: Guitar,
  },
  BANJO: {
    name: "BANJO",
    display: "Banjo",
    Fn: Banjo,
  },
  MANDOLIN: {
    name: "MANDOLIN",
    display: "Mandolin",
    Fn: Mandolin,
  },
  UKULELE: {
    name: "UKULELE",
    display: "Ukulele",
    Fn: Ukulele,
  },
  FLUTE: {
    name: "FLUTE",
    display: "Flute",
    Fn: Flute,
  },
  PIANO: {
    name: "PIANO",
    display: "Piano",
    Fn: Piano,
  },
  TREBLESTAFF: {
    name: "TREBLESTAFF",
    display: "Treble Staff",
    Fn: Treble,
  },
  TRIADS: {
    name: "TRIADS",
    display: "Triads",
    Fn: Triads,
  },
  TRIADCIRCLE: {
    name: "TRIADCIRCLE",
    display: "Circle of Triads",
    Fn: TriadCircle,
  },
  AUTOHARP: {
    name: "AUTOHARP",
    display: "Autoharp",
    Fn: Autoharp,
  },
};

export default function Tablature() {
  const [selected, setSelected] = useState([]);
  const { scaleData } = useContext(ScaleContext);

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
    {
      label: "Keyboard",
      options: [
        { label: "Piano", value: INST.PIANO.name },
        { label: "Autoharp", value: INST.AUTOHARP.name },
      ],
    },
    {
      label: "Staff Notation",
      options: [{ label: "Treble Staff", value: INST.TREBLESTAFF.name }],
    },
    {
      label: "Chords",
      options: [
        { label: "Triads", value: INST.TRIADS.name },
        {
          label: "Circle of Major and Minor Triads",
          value: INST.TRIADCIRCLE.name,
        },
      ],
    },
  ];

  const onChange = (newSelected, s) => {
    setSelected(newSelected);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newSelected = arrayMoveImmutable(selected, oldIndex, newIndex);
    onChange(newSelected);
  };

  const makeCloseFn = (name) => {
    return () => {
      const newSelected = selected.filter((s) => s.value !== name);
      setSelected(newSelected);
    };
  };

  const SortableTabsList = SortableContainer(({ keyData, curSelected }) => {
    return (
      <ul class="alltabscontainer">
        {curSelected.map((selection, i) => {
          if (INST[selection.value]) {
            const Inst = INST[selection.value];
            const SortableTab = SortableElement(() => {
              return (
                <TabContainer
                  onClose={makeCloseFn(Inst.name)}
                  instrumentName={Inst.display}
                >
                  <Inst.Fn keyData={keyData} />
                </TabContainer>
              );
            });
            return <SortableTab key={i} index={i}></SortableTab>;
          }
          return <></>;
        })}
      </ul>
    );
  });
  const keyData = ScaleData[scaleData.scale];
  return (
    <div className="tabsectioncontainer">
      <h2 className="tabsectioncontainer__title">Instruments</h2>
      <Select
        isMulti
        name="Tablature"
        onChange={onChange}
        options={options}
        value={selected}
        className="tabsectioncontainer__select"
        classNamePrefix="select"
        placeholder="add instrument..."
      />
      <SortableTabsList
        onSortEnd={onSortEnd}
        keyData={keyData}
        curSelected={selected}
      ></SortableTabsList>
    </div>
  );
}
