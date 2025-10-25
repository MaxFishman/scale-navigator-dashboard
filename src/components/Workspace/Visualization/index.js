import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { useSelector } from "react-redux";
import Layers from "./Layers";
import { jumpToScaleEvent } from "../../../events";

const FPS_RATE = 30;
let clickInNextFrame = 0;
let l = 0;
let last_mp = undefined;
let layers = [];
let breadcrumbs = {};

const getScaleObjectByName = (name = "", layers) => {
    for (var id = 0; id < layers.length; id++) {
        var l = layers[id];
        for (var po of l) {
            if (po) {
                if (po.scale === name) return { po: po, l: id };
            }
        }
    }
    return undefined;
};

const getCheckboxIDByScale = (scale) => {
    var a = ["diatonic", "acoustic", "major", "minor"];
    var b = ["hexatonic", "octatonic", "whole"];

    var s = scale.split("_");
    var id = a.indexOf(s[s.length - 1]);

    if (id == -1) {
        return 4 + b.indexOf(s[0]);
    } else return id;
};

const Visualization = ({ wrapperRef }) => {
    const { navigatorData } = useSelector((state) => state.root);
    const { old_main_polygon, main_polygon } = navigatorData;
    const p5Ref = useRef(null);
    const sketchRef = useRef(null);

    const addBreadcrumb = (p1, p2, st = true) => {
        if (!breadcrumbs[p1]) breadcrumbs[p1] = {};
        if (!breadcrumbs[p2]) breadcrumbs[p2] = {};

        breadcrumbs[p1][p2] = st;
        breadcrumbs[p2][p1] = st;
    };

    const setup = (p5, canvasParentRef) => {
        p5.frameRate(FPS_RATE);

        p5.createCanvas(
            canvasParentRef.clientWidth / 1.2,
            canvasParentRef.clientWidth / 1.2
        ).parent(canvasParentRef);

        const s = (p5.width + p5.height) / 100;

        layers = Layers(p5, s);

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
    };

    const draw = (p5) => {
        p5.push();
        p5.background(0);

        var mp = main_polygon;
        if (last_mp) {
            if (last_mp != mp.scale) {
                addBreadcrumb(last_mp, mp.scale);
            }
        }

        for (var id = 0; id < layers.length; id++) {
            const _layers = layers[id];
            let lay_ellipse_h_r = p5.height / 2 - _layers[0].y * p5.height;
            // let lay_ellipse_h_r = p5.height / 2 - _layers.y * p5.height;
            let lay_ellipse_w_r = (p5.width / p5.height) * lay_ellipse_h_r;

            for (var polygon of _layers) {
                if (polygon.data) {
                    if (main_polygon.scale === polygon.scale) {
                        if (
                            document.getElementById(
                                "visu_inp_l_" +
                                    getCheckboxIDByScale(polygon.scale)
                            ).checked
                        ) {
                            var x = polygon.x;
                            var y = polygon.y;

                            if (main_polygon.animation.active) {
                                var _p = main_polygon.animation.animation_curve(
                                    main_polygon.animation.progress()
                                );

                                const scaleName = getScaleObjectByName(
                                    old_main_polygon && old_main_polygon.scale,
                                    layers
                                );
                                const old_m_p = scaleName && scaleName.po;

                                if (old_m_p) {
                                    x = p5.lerp(polygon.x, old_m_p.x, 1 - _p);
                                    y = p5.lerp(polygon.y, old_m_p.y, 1 - _p);
                                }
                            }

                            p5.push();
                            p5.noStroke();

                            for (var i = 0; i < 1; i += 1 / 20) {
                                p5.fill(255, 255, 255, i * 64);
                                p5.ellipse(
                                    x * p5.width,
                                    y * p5.height,
                                    5 * polygon.radius * (1 - i)
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
                        cols_same[polygon.layer_id][3] *= 2;
                        layerAllowed = true;
                    }

                    for (var adj of polygon.data.adjacent_scales) {
                        var scale_d = getScaleObjectByName(adj, layers);
                        var scale = scale_d.po;

                        if (
                            scale &&
                            document.getElementById(
                                "visu_inp_l_" +
                                    getCheckboxIDByScale(scale.scale)
                            ).checked &&
                            document.getElementById(
                                "visu_inp_l_" +
                                    getCheckboxIDByScale(polygon.scale)
                            ).checked
                        ) {
                            if (scale.layer_id == polygon.layer_id) {
                                p5.stroke(...cols_same[polygon.layer_id]);
                                if (layerAllowed) p5.strokeWeight(sw * 3);
                                else p5.strokeWeight(sw);
                            } else {
                                p5.stroke(
                                    ...cols_dif[
                                        Math.abs(
                                            scale.layer_id - polygon.layer_id
                                        )
                                    ]
                                );
                                p5.strokeWeight(sw);
                            }

                            if (breadcrumbs[adj]) {
                                if (breadcrumbs[adj][[polygon.scale]]) {
                                    p5.stroke(
                                        255,
                                        0,
                                        0,
                                        main_polygon.scale === polygon.scale
                                            ? 255
                                            : alph
                                    );
                                }
                            } else if (main_polygon.scale === polygon.scale)
                                p5.stroke(255);

                            var x1 = p5.width * scale.x;
                            var y1 = p5.height * scale.y;
                            var x2 = p5.width * polygon.x;
                            var y2 = p5.height * polygon.y;

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
                        var n = mp.getNeighbors().map((x) => x.scale);

                        jumpToScaleEvent(po.scale);
                        addBreadcrumb(mp.scale, po.scale);

                        if (!n.includes(po.scale)) {
                            //resetBreadcrumbs();
                        }
                    }

                    po.draw(
                        false,
                        false,
                        { x: 0, y: 0 },
                        (main_polygon.scale == po.scale ? 1.25 : 1) +
                            (cli ? 0.2 : 0)
                    );
                }
            }
        }

        clickInNextFrame--;
        last_mp = main_polygon.scale;

        p5.pop();
    };

    const mousePressed = () => {
        clickInNextFrame = 1;
    };

    const windowResized = (p5) => {
        const wrapperElmDimensions = wrapperRef.current.getBoundingClientRect();
        p5.resizeCanvas(
            wrapperElmDimensions.width,
            wrapperElmDimensions.height
        );
    };

    // const windowResized = (p5) => {
    //     const parentElm = p5._renderer.parent();
    //     const { width, height } = parentElm.getBoundingClientRect();

    //     p5.resizeCanvas(width, height);

    //     for (var l of layers) {
    //         for (var po of l) {
    //             if (po) po.radius = (p5.width + p5.height) / 100;
    //         }
    //     }
    // };

    useEffect(() => {
        if (wrapperRef.current && !sketchRef.current) {
            const sketch = (p) => {
                p.setup = () => setup(p, wrapperRef.current);
                p.draw = () => draw(p);
                p.mousePressed = () => mousePressed();
                p.windowResized = () => windowResized(p);
            };
            
            sketchRef.current = new p5(sketch, wrapperRef.current);
        }

        return () => {
            if (sketchRef.current) {
                sketchRef.current.remove();
                sketchRef.current = null;
            }
        };
    }, [wrapperRef]);

    useEffect(() => {
        if (sketchRef.current && wrapperRef.current) {
            const wrapperElmDimensions = wrapperRef.current.getBoundingClientRect();
            sketchRef.current.resizeCanvas(
                wrapperElmDimensions.width,
                wrapperElmDimensions.height
            );
        }
    }, [wrapperRef]);

    return <div ref={p5Ref} />;
};

export default Visualization;
