import React from "react";
import Sketch from "react-p5";
import Polygon from "components/Navigation/Navigator/Polygon";
import ScaleData from "common/ScaleData";

const Visualization = () => {
    const fps = 30;
    var ran_setup = false;
    var canvasParentRef = document.getElementById("canv_container_visu");
    var cnv;
    var l = 0;
    /*
    var diatonic = [],
        acoustic = [],
        harmonic_major = [],
        harmonic_minor = [],
        octatonic = [],
        hexatonic = [],
        whole_tone = [];*/
    var layers = [];

    const setup = (p5) => {
        if (canvasParentRef == null) canvasParentRef = document.getElementById("canv_container_visu");
        if (canvasParentRef) {
            const p = canvasParentRef.getBoundingClientRect();

            cnv = p5.createCanvas(p.width * 0.9, p.height * 0.9).parent(canvasParentRef);
            p5.frameRate(fps);
            windowResized(p5);

            ran_setup = true;

            var keys = Object.keys(ScaleData);
            var scale_data_arr = keys.map((k, id) => Object.defineProperty(ScaleData[k], "name", { value: k }));

            var s = (p5.width + p5.height) / 100;

            layers = [
                [
                    new Polygon(p5, 0, 0, s, "c_diatonic"),
                    new Polygon(p5, 0, 0, s, "f_diatonic"),
                    new Polygon(p5, 0, 0, s, "as_diatonic"),
                    new Polygon(p5, 0, 0, s, "ds_diatonic"),
                    new Polygon(p5, 0, 0, s, "gs_diatonic"),
                    new Polygon(p5, 0, 0, s, "cs_diatonic"),
                    new Polygon(p5, 0, 0, s, "fs_diatonic"),
                    new Polygon(p5, 0, 0, s, "b_diatonic"),
                    new Polygon(p5, 0, 0, s, "e_diatonic"),
                    new Polygon(p5, 0, 0, s, "a_diatonic"),
                    new Polygon(p5, 0, 0, s, "d_diatonic"),
                    new Polygon(p5, 0, 0, s, "g_diatonic")
                ],
                [
                    new Polygon(p5, 0, 0, s, "c_acoustic"),
                    new Polygon(p5, 0, 0, s, "f_acoustic"),
                    new Polygon(p5, 0, 0, s, "as_acoustic"),
                    new Polygon(p5, 0, 0, s, "ds_acoustic"),
                    new Polygon(p5, 0, 0, s, "gs_acoustic"),
                    new Polygon(p5, 0, 0, s, "cs_acoustic"),
                    new Polygon(p5, 0, 0, s, "fs_acoustic"),
                    new Polygon(p5, 0, 0, s, "b_acoustic"),
                    new Polygon(p5, 0, 0, s, "e_acoustic"),
                    new Polygon(p5, 0, 0, s, "a_acoustic"),
                    new Polygon(p5, 0, 0, s, "d_acoustic"),
                    new Polygon(p5, 0, 0, s, "g_acoustic")
                ],
                [
                    new Polygon(p5, 0, 0, s, "d_harmonic_minor"),
                    new Polygon(p5, 0, 0, s, "f_harmonic_major"),
                    new Polygon(p5, 0, 0, s, "f_harmonic_minor"),
                    new Polygon(p5, 0, 0, s, "gs_harmonic_major"),
                    new Polygon(p5, 0, 0, s, "gs_harmonic_minor"),
                    new Polygon(p5, 0, 0, s, "b_harmonic_major"),
                    new Polygon(p5, 0, 0, s, "b_harmonic_minor"),
                    new Polygon(p5, 0, 0, s, "d_harmonic_major")
                ],
                [
                     
                     undefined,
                     new Polygon(p5, 0, 0, s, "c_harmonic_major"),
                     new Polygon(p5, 0, 0, s, "c_harmonic_minor"),
                     undefined,
                     new Polygon(p5, 0, 0, s, "ds_harmonic_major"),
                     new Polygon(p5, 0, 0, s, "ds_harmonic_minor"),
                     undefined,
                     new Polygon(p5, 0, 0, s, "fs_harmonic_major"),
                     new Polygon(p5, 0, 0, s, "fs_harmonic_minor"),
                     undefined,
                     new Polygon(p5, 0, 0, s, "a_harmonic_major"),
                     new Polygon(p5, 0, 0, s, "a_harmonic_minor"),
                ],
                [
                     new Polygon(p5, 0, 0, s, "g_harmonic_major"),
                     new Polygon(p5, 0, 0, s, "g_harmonic_minor"),
                     new Polygon(p5, 0, 0, s, "as_harmonic_major"),
                     new Polygon(p5, 0, 0, s, "as_harmonic_minor"),
                     new Polygon(p5, 0, 0, s, "cs_harmonic_major"),
                     new Polygon(p5, 0, 0, s, "cs_harmonic_minor"),
                     new Polygon(p5, 0, 0, s, "e_harmonic_major"),
                     new Polygon(p5, 0, 0, s, "e_harmonic_minor"),
                ],
                [
                     new Polygon(p5, 0, 0, s, "hexatonic_1"),
                     new Polygon(p5, 0, 0, s, "hexatonic_2"),
                     new Polygon(p5, 0, 0, s, "hexatonic_3"),
                     new Polygon(p5, 0, 0, s, "hexatonic_4"),
                ],
                [
                     undefined,
                     new Polygon(p5, 0, 0, s, "octatonic_1"),
                     undefined,
                     new Polygon(p5, 0, 0, s, "octatonic_2"),
                     undefined,
                     new Polygon(p5, 0, 0, s, "octatonic_3"),
                ],
                [
                     undefined,
                     new Polygon(p5, 0, 0, s, "whole_tone_1"),
                     undefined,
                     new Polygon(p5, 0, 0, s, "whole_tone_2"),
                ]
            ];

            p5.translate(p5.width / 2, p5.height / 2)

            for (var j = 0; j < layers.length; j++) {
                l = 45 / 50 - j / (layers.length + 1)
                var arr = layers[j];
                for (var i = 0; i < arr.length; i++) {
                    var a = Math.PI * 2 * i / arr.length - Math.PI / 2;
                    var x = Math.cos(a) * l / 2
                    var y = Math.sin(a) * l / 2

                    if (arr[i]) {
                        arr[i].x = x + 1 / 2;
                        arr[i].y = y + 1 / 2;

                        arr[i].layer_id = j;
                    }
                }
            }
        }
    };

    const draw = (p5) => {
        if (!ran_setup) setup(p5);
        else {
            p5.push();

            cnv.parent(canvasParentRef)
            const p = canvasParentRef.getBoundingClientRect();
            if (p5.width != p.width * .9 || p5.height != p.height * .9) windowResized(p5);
            p5.background(0)

            function getScaleObjectByName(name) {
                for (var l of layers) {
                    for (var po of l) {
                        if (po) {
                            if (po.scale == name) return po;
                        }
                    }
                }
                return undefined;
            }

            for (var l of layers) {
                for (var po of l) {
                    if (po) {
                        if (window.navRef.current.main_polygon.scale == po.scale) {
                            var x = po.x;
                            var y = po.y;

                            p5.push();
                            p5.noStroke();
                            for (var i = 0; i < 1; i += 1 / 20) {
                                // p5.fill(255, 222, 106, i * 64)
                                // p5.ellipse(x * p5.width, y * p5.height, 5 * po.radius * (1 - i))
                            }
                            p5.pop();
                        }

                        p5.push();
                        p5.stroke(255, 16)
                        var sw = (p5.width + p5.height) / 1000
                        var layerAllowed = false;
                        var alph = 12.5;
                        var cols_same = [
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph]
                        ]
                        alph = 12.5;
                        var cols_dif = [
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph]
                        ]

                        if (l.map(x => { if (x) return x.scale }).includes(window.navRef.current.main_polygon.scale)) {
                            cols_same[po.layer_id][3] *= 2;
                            layerAllowed = true;
                        }

                        for (var adj of po.data.adjacent_scales) {
                            var scale = getScaleObjectByName(adj);

                            if (scale) {
                                if (scale.layer_id == po.layer_id) {
                                    p5.stroke(...cols_same[po.layer_id])
                                    if (layerAllowed) p5.strokeWeight(sw * 3)
                                    else p5.strokeWeight(sw)
                                } else {
                                    p5.stroke(...cols_dif[Math.abs(scale.layer_id - po.layer_id)])
                                    p5.strokeWeight(sw)
                                }

                                var x1 = p5.width * scale.x;
                                var y1 = p5.height * scale.y;
                                var x2 = p5.width * po.x;
                                var y2 = p5.height * po.y;

                                p5.line(x1, y1, x2, y2);
                            }
                        }
                        p5.pop();
                    }
                }
            }

            for (var l of layers) {
                for (var po of l) {
                    if (po) {
                        po.draw(false, false, { x: 0, y: 0 },
                            window.navRef.current.main_polygon.scale == po.scale ? 1 : 1)
                    }
                }
            }

            p5.pop();
        }
    };

    const mousePressed = (p5, event) => {};

    const mouseReleased = (p5, event) => {};

    const windowResized = (p5) => {
        if (canvasParentRef) {
            const p = canvasParentRef.getBoundingClientRect();
            p5.resizeCanvas(p.width * 0.9, p.height * 0.9);

            for (var l of layers) {
                for (var po of l) {
                    if (po) po.radius = (p5.width + p5.height) / 100;
                }
            }
        }
    };

    const preload = (p5) => {}


    return ( <
        Sketch preload = { preload }
        setup = { setup }
        draw = { draw }
        mousePressed = { mousePressed }
        mouseReleased = { mouseReleased }
        windowResized = { windowResized }
        />
    );
};

export default Visualization;
