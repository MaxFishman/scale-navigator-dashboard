import React from "react";
import Sketch from "react-p5";
import Layers from "./Layers";

const fps = 30;
let clickInNextFrame = 0;
let ran_setup = false;
let cnv;
let l = 0;
let last_mp = undefined;
let layers = [];

const Visualization = () => {
    // var canvasParentRef = document.getElementById("canv_container_visu");
    console.log("Init Visualization");
    window.breadcrumbs = {};

    const addBreadcrumb = (p1, p2, st = true) => {
        if (!window.breadcrumbs[p1]) window.breadcrumbs[p1] = {};
        if (!window.breadcrumbs[p2]) window.breadcrumbs[p2] = {};

        window.breadcrumbs[p1][p2] = st;
        window.breadcrumbs[p2][p1] = st;
    };

    const setup = (p5, canvasParentRef) => {
        if (canvasParentRef == null)
            canvasParentRef = document.getElementById("canv_container_visu");
        if (canvasParentRef) {
            const p = canvasParentRef.getBoundingClientRect();
            var s = (p5.width + p5.height) / 100;

            cnv = p5
                .createCanvas(p.width * 0.9, p.height * 0.9)
                .parent(canvasParentRef);

            p5.frameRate(fps);
            windowResized(p5);
            ran_setup = true;

            layers = Layers(p5, s);

            p5.translate(p5.width / 2, p5.height / 2);

            for (var j = 0; j < layers.length; j++) {
                l = 45 / 50 - j / (layers.length + 1);
                var arr = layers[j];
                for (var i = 0; i < arr.length; i++) {
                    var a = (Math.PI * 2 * i) / arr.length - Math.PI / 2;
                    var x = (Math.cos(a) * l) / 2;
                    var y = (Math.sin(a) * l) / 2;

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

            // cnv.parent(canvasParentRef);
            // const p = canvasParentRef.getBoundingClientRect();
            // if (p5.width != p.width * 0.9 || p5.height != p.height * 0.9) {
            //     windowResized(p5);
            // }

            p5.background(0);

            function getScaleObjectByName(name) {
                for (var id = 0; id < layers.length; id++) {
                    var l = layers[id];
                    for (var po of l) {
                        if (po) {
                            if (po.scale == name) return { po: po, l: id };
                        }
                    }
                }
                return undefined;
            }

            function getCheckboxIDByScale(scale) {
                var a = ["diatonic", "acoustic", "major", "minor"];
                var b = ["hexatonic", "octatonic", "whole"];

                var s = scale.split("_");
                var id = a.indexOf(s[s.length - 1]);

                if (id == -1) {
                    return 4 + b.indexOf(s[0]);
                } else return id;
            }

            var old_m_p;

            // TODO:
            // Data shouldnt be under window object.
            if (window.navRef.current.old_main_polygon) {
                old_m_p = getScaleObjectByName(
                    window.navRef.current.old_main_polygon.scale
                ).po;
            }

            var mp = window.navRef.current.main_polygon;
            if (last_mp) {
                if (last_mp != mp.scale) {
                    addBreadcrumb(last_mp, mp.scale);
                }
            }

            for (var id = 0; id < layers.length; id++) {
                var l = layers[id];

                var lay_ellipse_w_r;
                var lay_ellipse_h_r;
                lay_ellipse_h_r = p5.height / 2 - l[0].y * p5.height;
                lay_ellipse_w_r = (p5.width / p5.height) * lay_ellipse_h_r;

                for (var po of l) {
                    if (po.data) {
                        if (
                            window.navRef.current.main_polygon.scale == po.scale
                        ) {
                            if (
                                document.getElementById(
                                    "visu_inp_l_" +
                                        getCheckboxIDByScale(po.scale)
                                ).checked
                            ) {
                                var x = po.x;
                                var y = po.y;

                                if (
                                    window.navRef.current.main_polygon.animation
                                        .active
                                ) {
                                    var _p =
                                        window.navRef.current.main_polygon.animation.animation_curve(
                                            window.navRef.current.main_polygon.animation.progress()
                                        );
                                    x = p5.lerp(po.x, old_m_p.x, 1 - _p);
                                    y = p5.lerp(po.y, old_m_p.y, 1 - _p);
                                }

                                p5.push();
                                p5.noStroke();
                                for (var i = 0; i < 1; i += 1 / 20) {
                                    p5.fill(255, 255, 255, i * 64);
                                    p5.ellipse(
                                        x * p5.width,
                                        y * p5.height,
                                        5 * po.radius * (1 - i)
                                    );
                                }
                                p5.pop();
                            }
                        }

                        p5.push();
                        p5.stroke(255, 16);
                        var sw = (p5.width + p5.height) / 1000;
                        var layerAllowed = false;
                        var alph = 50;
                        var cols_same = [
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                        ];
                        var cols_dif = [
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                            [255, 255, 255, alph],
                        ];

                        var ang =
                            Math.PI / 2 -
                            Math.atan2(
                                (p5.mouseX - p5.width / 2) / lay_ellipse_w_r,
                                (p5.mouseY - p5.height / 2) / lay_ellipse_h_r
                            );
                        if (
                            p5.dist(
                                Math.cos(ang) * lay_ellipse_w_r + p5.width / 2,
                                Math.sin(ang) * lay_ellipse_h_r + p5.height / 2,
                                p5.mouseX,
                                p5.mouseY
                            ) < 15
                        ) {
                            cols_same[po.layer_id][3] *= 2;
                            layerAllowed = true;
                        }

                        for (var adj of po.data.adjacent_scales) {
                            var scale_d = getScaleObjectByName(adj);
                            var scale = scale_d.po;

                            if (
                                scale &&
                                document.getElementById(
                                    "visu_inp_l_" +
                                        getCheckboxIDByScale(scale.scale)
                                ).checked &&
                                document.getElementById(
                                    "visu_inp_l_" +
                                        getCheckboxIDByScale(po.scale)
                                ).checked
                            ) {
                                if (scale.layer_id == po.layer_id) {
                                    p5.stroke(...cols_same[po.layer_id]);
                                    if (layerAllowed) p5.strokeWeight(sw * 3);
                                    else p5.strokeWeight(sw);
                                } else {
                                    p5.stroke(
                                        ...cols_dif[
                                            Math.abs(
                                                scale.layer_id - po.layer_id
                                            )
                                        ]
                                    );
                                    p5.strokeWeight(sw);
                                }

                                if (window.breadcrumbs[adj]) {
                                    if (window.breadcrumbs[adj][[po.scale]]) {
                                        p5.stroke(
                                            255,
                                            0,
                                            0,
                                            window.navRef.current.main_polygon
                                                .scale == po.scale
                                                ? 255
                                                : alph
                                        );
                                    }
                                } else if (
                                    window.navRef.current.main_polygon.scale ==
                                    po.scale
                                )
                                    p5.stroke(255);

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

            for (let id = 0; id < layers.length; id++) {
                var l = layers[id];

                for (let po of l) {
                    if (
                        po.data &&
                        document.getElementById(
                            "visu_inp_l_" + getCheckboxIDByScale(po.scale)
                        ).checked
                    ) {
                        var cli = po.click();
                        if (cli && clickInNextFrame > 0) {
                            var mp = window.navRef.current.main_polygon;
                            var n = mp.getNeighbors().map((x) => x.scale);

                            addBreadcrumb(mp.scale, po.scale);
                            window.navRef.current.jumpToScale(po.scale);

                            if (!n.includes(po.scale)) {
                                //resetBreadcrumbs();
                            }
                        }

                        po.draw(
                            false,
                            false,
                            { x: 0, y: 0 },
                            (window.navRef.current.main_polygon.scale ==
                            po.scale
                                ? 1.25
                                : 1) + (cli ? 0.2 : 0)
                        );
                    }
                }
            }

            clickInNextFrame--;
            last_mp = window.navRef.current.main_polygon.scale;

            p5.pop();
        }
    };

    const mousePressed = (p5, event) => {
        clickInNextFrame = 1;
    };

    const windowResized = (p5) => {
        // if (canvasParentRef) {
        //     const p = canvasParentRef.getBoundingClientRect();
        //     p5.resizeCanvas(p.width * 0.9, p.height * 0.9);
        //     for (var l of layers) {
        //         for (var po of l) {
        //             if (po) po.radius = (p5.width + p5.height) / 100;
        //         }
        //     }
        // }
    };

    return (
        <Sketch
            setup={setup}
            draw={draw}
            mousePressed={mousePressed}
            windowResized={windowResized}
        />
    );
};

export default Visualization;
