import React from "react";
import "./Autoharp.scss";
import classNames from "classnames";

export default function Autoharp({ keyData }) {
  return (
    <>
      <div class="autoharp">
        <div
          class={classNames("piano__button piano__button--white c", {
            "piano__button--on": keyData.pitch_classes.includes(0),
          })}
        ></div>
        <div
          class={classNames("piano__button piano__button--black c_sharp", {
            "piano__button--on": keyData.pitch_classes.includes(1),
          })}
        ></div>
        <div
          class={classNames("piano__button piano__button--white d", {
            "piano__button--on": keyData.pitch_classes.includes(2),
          })}
        ></div>
        <div
          class={classNames("piano__button piano__button--black d_sharp", {
            "piano__button--on": keyData.pitch_classes.includes(3),
          })}
        ></div>
        <div
          class={classNames("piano__button piano__button--white e", {
            "piano__button--on": keyData.pitch_classes.includes(4),
          })}
        ></div>
        <div
          class={classNames("piano__button piano__button--white f", {
            "piano__button--on": keyData.pitch_classes.includes(5),
          })}
        ></div>
        <div
          class={classNames("piano__button piano__button--black f_sharp", {
            "piano__button--on": keyData.pitch_classes.includes(6),
          })}
        ></div>
        <div
          class={classNames("piano__button piano__button--white g", {
            "piano__button--on": keyData.pitch_classes.includes(7),
          })}
        ></div>
        <div
          class={classNames("piano__button piano__button--black g_sharp", {
            "piano__button--on": keyData.pitch_classes.includes(8),
          })}
        ></div>
        <div
          class={classNames("piano__button piano__button--white a", {
            "piano__button--on": keyData.pitch_classes.includes(9),
          })}
        ></div>
        <div
          class={classNames("piano__button piano__button--black a_sharp", {
            "piano__button--on": keyData.pitch_classes.includes(10),
          })}
        ></div>
        <div
          class={classNames("piano__button piano__button--white b", {
            "piano__button--on": keyData.pitch_classes.includes(11),
          })}
        ></div>
      </div>
      <div class="piano__clear"></div>
    </>
  );
}
