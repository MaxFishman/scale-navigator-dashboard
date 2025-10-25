import React from "react";
import "./Autoharp.scss";
import classNames from "classnames";

export default function Autoharp({ keyData }) {
    return (
        <>
            <div className="autoharp">
                <div
                    className={classNames("autoharp__button autoharp__button c", {
                        "autoharp__button--on":
                            keyData.pitch_classes.includes(0),
                    })}
                >
                    <h2>C</h2>
                </div>
                <div
                    className={classNames(
                        "autoharp__button autoharp__button d_sharp",
                        {
                            "autoharp__button--on":
                                keyData.pitch_classes.includes(3),
                        }
                    )}
                >
                    <h2>E♭</h2>
                </div>
                <div
                    className={classNames(
                        "autoharp__button autoharp__button f_sharp",
                        {
                            "autoharp__button--on":
                                keyData.pitch_classes.includes(6),
                        }
                    )}
                >
                    <h2>F♯</h2>
                </div>
                <div
                    className={classNames("autoharp__button autoharp__button a", {
                        "autoharp__button--on":
                            keyData.pitch_classes.includes(9),
                    })}
                >
                    <h2>A</h2>
                </div>
                <div
                    className={classNames(
                        "autoharp__button autoharp__button c_sharp",
                        {
                            "autoharp__button--on":
                                keyData.pitch_classes.includes(1),
                        }
                    )}
                >
                    <h2>C♯</h2>
                </div>
                <div
                    className={classNames("autoharp__button autoharp__button e", {
                        "autoharp__button--on":
                            keyData.pitch_classes.includes(4),
                    })}
                >
                    {" "}
                    <h2>E</h2>
                </div>
                <div
                    className={classNames("autoharp__button autoharp__button g", {
                        "autoharp__button--on":
                            keyData.pitch_classes.includes(7),
                    })}
                >
                    <h2>G</h2>
                </div>
                <div
                    className={classNames(
                        "autoharp__button autoharp__button a_sharp",
                        {
                            "autoharp__button--on":
                                keyData.pitch_classes.includes(10),
                        }
                    )}
                >
                    <h2>B♭</h2>
                </div>
                <div
                    className={classNames("autoharp__button autoharp__button d", {
                        "autoharp__button--on":
                            keyData.pitch_classes.includes(2),
                    })}
                >
                    <h2>D</h2>
                </div>

                <div
                    className={classNames("autoharp__button autoharp__button f", {
                        "autoharp__button--on":
                            keyData.pitch_classes.includes(5),
                    })}
                >
                    {" "}
                    <h2>F</h2>
                </div>

                <div
                    className={classNames(
                        "autoharp__button autoharp__button g_sharp",
                        {
                            "autoharp__button--on":
                                keyData.pitch_classes.includes(8),
                        }
                    )}
                >
                    <h2>G♯</h2>
                </div>

                <div
                    className={classNames("autoharp__button autoharp__button b", {
                        "autoharp__button--on":
                            keyData.pitch_classes.includes(11),
                    })}
                >
                    <h2>B</h2>
                </div>
            </div>
            <div className="autoharp__clear"></div>
        </>
    );
}
