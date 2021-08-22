import React from "react";
import "./Keyboard.scss";
import classNames from "classnames";

export default function Piano({ keyData }) {
  return (
    <div class="piano">
      <div
        class={classNames("piano__key piano__key--white c", {
          "piano__key--on": keyData.pitch_classes.includes(0),
        })}
      ></div>
      <div
        class={classNames("piano__key piano__key--black c_sharp", {
          "piano__key--on": keyData.pitch_classes.includes(1),
        })}
      ></div>
      <div
        class={classNames("piano__key piano__key--white d", {
          "piano__key--on": keyData.pitch_classes.includes(2),
        })}
      ></div>
      <div
        class={classNames("piano__key piano__key--black d_sharp", {
          "piano__key--on": keyData.pitch_classes.includes(3),
        })}
      ></div>
      <div
        class={classNames("piano__key piano__key--white e", {
          "piano__key--on": keyData.pitch_classes.includes(4),
        })}
      ></div>
      <div
        class={classNames("piano__key piano__key--white f", {
          "piano__key--on": keyData.pitch_classes.includes(5),
        })}
      ></div>
      <div
        class={classNames("piano__key piano__key--black f_sharp", {
          "piano__key--on": keyData.pitch_classes.includes(6),
        })}
      ></div>
      <div
        class={classNames("piano__key piano__key--white g", {
          "piano__key--on": keyData.pitch_classes.includes(7),
        })}
      ></div>
      <div
        class={classNames("piano__key piano__key--black g_sharp", {
          "piano__key--on": keyData.pitch_classes.includes(8),
        })}
      ></div>
      <div
        class={classNames("piano__key piano__key--white a", {
          "piano__key--on": keyData.pitch_classes.includes(9),
        })}
      ></div>
      <div
        class={classNames("piano__key piano__key--black a_sharp", {
          "piano__key--on": keyData.pitch_classes.includes(10),
        })}
      ></div>
      <div
        class={classNames("piano__key piano__key--white b", {
          "piano__key--on": keyData.pitch_classes.includes(11),
        })}
      ></div>
    </div>
  );
}
