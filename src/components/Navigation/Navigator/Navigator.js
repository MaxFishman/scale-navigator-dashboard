import Polygon from "./Polygon";
import Helper from "./Helper";


let scale = "c_diatonic";
let main_polygon = undefined;
let preview_polygons;
let hover_polygons;
let hover_polygons_to_be_removed;
let actually_new_polygons;
let last_clicked_polygon;
let old_neighbors;
let old_main_polygon;
let preview_polygons_ready = false;
let neighbors = [];
let poly_size = 61;

const autopilot_data = {
    active: false,
    default_period: [1000, 2000, 3000, 4000],
    period: undefined,
    chosen: undefined,
    intervalID: undefined,
    animate: true,
    max_visited: 10,
    visited: [],
    chordClicks: 0,
};

export const init = ({ p5, setNavigatorData, setScaleData }) => {
    window.addEventListener(
        "jumpToScale",
        (e) => {
            jumpToScale({
                p5,
                newScale: e.detail.polygonScale,
                setScaleData,
                setNavigatorData,
            });
        },
        false
    );

    window.addEventListener(
        "navigatorAutoPilot",
        (e) => {
            toggle_autopilot(e.detail.state);
        },
        false
    );

    init_autopilot({ p5, setScaleData });

    poly_size = (p5.width + p5.height) / 22;
    poly_size = p5.max(1200 / 22, poly_size);

    initPolygons({ p5, setNavigatorData });
};

export const initPolygons = ({ p5, setNavigatorData }) => {
    main_polygon = new Polygon(p5, 0.5, 0.5, poly_size, scale);

    setNavigatorData({ main_polygon });

    neighbors = main_polygon.getNeighbors();
    old_main_polygon = undefined;
    old_neighbors = undefined;
    last_clicked_polygon = undefined;
    actually_new_polygons = undefined;
    hover_polygons = [];
    hover_polygons_to_be_removed = [];
    preview_polygons = [];
};

export const init_autopilot = ({ p5, setScaleData }) => {
    if (!p5) return;

    if (!autopilot_data.period)
        autopilot_data.period = autopilot_data.default_period;

    var k = 1;
    const elm = document.getElementById("autopilot_interval");

    if (elm) k = elm.value;
    autopilot_data.chosen = p5.random(autopilot_data.period.map((x) => x * k));

    autopilot_data.intervalID = () => {
        return setInterval(
            () => {
                if (autopilot_data.active) {
                    var p = p5.random(neighbors.concat(main_polygon));


                    var passes = 0;
                    while (autopilot_data.visited.includes(p) && passes < 100) {
                        p = p5.random(neighbors.concat(main_polygon));
                        passes++;
                    }

                    var k = 1;
                    if (
                        document.getElementById("autopilot_interval") != null &&
                        document.getElementById("autopilot_interval")
                    )
                        k = document.getElementById("autopilot_interval").value;
                    autopilot_data.chosen = p5.random(
                        autopilot_data.period.map((x) => x * k)
                    );

                    if (autopilot_data.chordClicks > p5.random(4, 8)) {
                        if (
                            autopilot_data.visited.length >=
                            autopilot_data.max_visited
                        ) {
                            autopilot_data.visited.pop();
                        }
                        autopilot_data.visited.unshift(p);

                        autopilot_data.chordClicks = 0;
                    } else {
                        p = main_polygon;
                        autopilot_data.chordClicks++;
                        autopilot_data.chosen =
                            Math.sqrt(autopilot_data.chosen / 500) * 500;
                    }

                    changeMainScale({
                        p5,
                        new_main: p,
                        all_duration: Helper.default_animation_duration,
                        animation: autopilot_data.animate,
                        setScaleData,
                    });

                    set_autopilot_period({
                        p5,
                        new_period: autopilot_data.default_period,
                    });
                    return;
                }
            },
            autopilot_data.chosen,
            p5
        );
    };
};

export const toggle_autopilot = (forced_value = undefined) => {
    if (forced_value) {
        autopilot_data.active = forced_value;
    } else {
        autopilot_data.active = !autopilot_data.active;
    }
};

export const reset_autopilot = () => {
    autopilot_data.active = false;
    autopilot_data.visited = [];
    autopilot_data.chordClicks = 0;
    // set_autopilot_period(undefined);
};

export const set_autopilot_period = ({ p5, new_period }) => {
    autopilot_data.period = new_period;
    clearInterval(autopilot_data.intervalID);
    init_autopilot(p5);
};

export const toggle_autopilot_animation = (forced_value = undefined) => {
    if (forced_value) {
        autopilot_data.animate = forced_value;
    } else {
        autopilot_data.animate = !autopilot_data.active;
    }
};

export const navigatorDraw = ({ p5 }) => {
    try {
        p5.push();
        p5.ellipseMode(p5.RADIUS);

        for (var h = 0; h < hover_polygons.length; h++) {
            hover_polygons[h].draw(false);
        }


        // background(255);
        var allPolygons = [main_polygon].concat(
            preview_polygons,
            old_neighbors
        );
        allPolygons.push(...neighbors);
        allPolygons.push(old_main_polygon);

        //draw all the polygons
        for (var p of allPolygons) {
            if (p) {
                // p.draw(
                //     true,
                //     p != main_polygon,
                //     neighbors.includes(p)
                //         ? {
                //               x:
                //                   (p.animation.target.x -
                //                       main_polygon.animation.target.x) /
                //                   3,
                //               y:
                //                   (p.animation.target.y -
                //                       main_polygon.animation.target.y) /
                //                   3,
                //           }
                //         : { x: 0, y: 0 }
                // );
                p.draw(true);
            }
            // document.getElementById("labels_checkbox").checked
        }


        third_gen_hover(p5);

        p5.pop();
    } catch (error) {
        console.error(error);
    }
};

export const navigatorMousePressed = ({ p5, setScaleData, event }) => {
    try {
        if (event.type === "mousedown") {
            if (main_polygon.click()) {
                // Need to indicate to Chord player to change Chords
                updateScaleState({ setScaleData, newScale: scale });
                return;
            }
            // check for clicks on all polygons
            for (var p of neighbors) {
                if (p && p.click() && !p.animation.active) {
                    prepareChangeMainScale({ p5, p });
                    return;
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
};

export const navigatorMouseReleased = ({
    setScaleData,
    setNavigatorData,
    event,
}) => {
    if (event.type === "mouseup") {
        // check for clicks on all polygons
        for (var p of neighbors) {
            if (
                p &&
                p.click() &&
                !p.animation.active &&
                preview_polygons_ready
            ) {
                finishChangeMainScale({
                    setScaleData,
                    setNavigatorData,
                    new_main: p,
                });
                return;
            }
        }
    }
};

export const third_gen_hover = (p5) => {
    for (var h = 0; h < hover_polygons_to_be_removed.length; h++) {
        hover_polygons.splice(hover_polygons_to_be_removed[h], 1);
        hover_polygons_to_be_removed.splice(
            hover_polygons_to_be_removed.indexOf(h),
            1
        );
        hover_polygons_to_be_removed = hover_polygons_to_be_removed.map(
            (x) => x - 1
        );
        h--;
    }

    for (var n of neighbors) {
        var clickData = n.click(p5.mouseX, p5.mouseY, true);
        if (clickData.start && !n.animation.active) {
            var add = get_new_neighbors(n).new;

            var total_poly = neighbors.length;
            var ind = main_polygon
                .getNeighbors()
                .findIndex((x) => x.isMatching(n));
            var pos = n.getNeighborPositions(
                n.x,
                n.y,
                n.radius,
                undefined,
                undefined,
                p5.PI / 2 + (2 * p5.PI * (ind - 1)) / total_poly,
                p5.PI / 2 + (2 * p5.PI * (ind + 1)) / total_poly,
                add.length
            );

            for (var p = 0; p < add.length; p++) {
                add[p].set(["x", n.x], ["y", n.y], ["generated_from", n]);
                add[p].move(
                    pos[p].x,
                    pos[p].y,
                    Helper.default_animation_duration / 2
                );
            }

            hover_polygons.push(...add);
        } else if (clickData.end) {
            for (let p of get_new_neighbors(n).new) {
                for (let h = 0; h < hover_polygons.length; h++) {
                    if (
                        hover_polygons[h].isMatching(p) &&
                        hover_polygons[h].generated_from == n
                    ) {
                        var _h = hover_polygons[h];

                        _h.move(
                            n.x,
                            n.y,
                            Helper.default_animation_duration / 2,
                            _h.radius,
                            1,
                            (id) => {
                                hover_polygons_to_be_removed.push(id);
                            },
                            [h]
                        );
                    }
                }
            }
        }
    }
};

export const prepareChangeMainScale = ({ p5, p, animation = false }) => {
    last_clicked_polygon = p;
    hover_polygons = [];

    // convert to array
    var pl = get_new_neighbors(p);
    actually_new_polygons = pl.new;
    preview_polygons = pl.preview;

    // take care of the fanning out (not all the way around)
    var total_poly = neighbors.length;
    var ind = main_polygon.getNeighbors().findIndex((x) => x.isMatching(p));

    if (ind >= 0) {
        var positions = p.getNeighborPositions(
            p.x,
            p.y,
            p.radius,
            undefined,
            undefined,
            p5.PI / 2 + (2 * p5.PI * (ind - 1)) / total_poly,
            p5.PI / 2 + (2 * p5.PI * (ind + 1)) / total_poly,
            actually_new_polygons.length
        );
        // var positions = p.getNeighborPositions(
        //     p.x,
        //     p.y,
        //     p5.RADIUS,
        //     undefined,
        //     undefined,
        //     p5.PI / 2,
        //     p5.PI / 2 + 2 * p5.PI,
        //     actually_new_polygons.length
        // );

        //position them
        for (var a_n = 0; a_n < actually_new_polygons.length; a_n++) {
            var pol = preview_polygons.find((x) =>
                actually_new_polygons[a_n].isMatching(x)
            );

            pol.set(
                ["x", positions[a_n].x],
                ["y", positions[a_n].y],
                ["size", positions[a_n].size]
            );
        }

        if (animation) {
            for (var prev of actually_new_polygons) {
                var oldx = prev.x;
                var oldy = prev.y;

                prev.set(["x", p.x], ["y", p.y]);
                prev.move(oldx, oldy, prev.size);
            }
        }

        preview_polygons_ready = true;
    }

    return;
};

export const updateSizes = (p5) => {
    var oldps = poly_size;
    poly_size = (p5.width + p5.height) / 22;
    poly_size = p5.max(1200 / 22, poly_size);

    //background(255);
    var allPolygons = [main_polygon].concat(
        preview_polygons,
        old_neighbors,
        hover_polygons
    );
    allPolygons.push(...neighbors);
    allPolygons.push(old_main_polygon);

    for (let p of allPolygons) {
        if (p) p.radius = (p.radius / oldps) * poly_size;
    }

    var pos = main_polygon.getNeighborPositions();
    for (let p = 0; p < neighbors.length; p++) {
        neighbors[p].x = pos[p].x;
        neighbors[p].y = pos[p].y;
    }
};

export const get_new_neighbors = (p) => {
    var prev_poly = p.getNeighbors();

    // duplicates between neighbors
    var all_current = neighbors.concat([main_polygon]);
    var acc_new_poly = new Set();

    for (var n = 0; n < all_current.length; n++) {
        for (var pre = 0; pre < prev_poly.length; pre++) {
            if (all_current[n].isMatching(prev_poly[pre])) {
                prev_poly[pre] = all_current[n];
            }
        }
    }

    // find polygons which are actually new
    for (var _pre = 0; _pre < prev_poly.length; _pre++) {
        if (!all_current.includes(prev_poly[_pre])) {
            acc_new_poly.add(prev_poly[_pre]);
        }
    }

    return {
        new: Array.from(acc_new_poly),
        preview: prev_poly,
    };
};

export const finishChangeMainScale = ({
    setNavigatorData,
    new_main,
    all_duration = Helper.default_animation_duration,
    setScaleData,
}) => {
    // p5.push the current polygons into old polygons
    old_neighbors = [...neighbors];
    old_main_polygon = main_polygon;
    setNavigatorData({ old_main_polygon: main_polygon });

    main_polygon = new_main;
    setNavigatorData({ main_polygon: new_main });

    neighbors = preview_polygons;

    //Handle duplicates
    old_neighbors.splice(old_neighbors.indexOf(main_polygon), 1);

    // duplicate of main polygon
    var index = neighbors.findIndex((x) => {
        return old_main_polygon.isMatching(x);
    });
    if (index !== -1) {
        neighbors[index] = old_main_polygon;
    }

    // Main polygons animation
    main_polygon.move(0.5, 0.5, all_duration, poly_size);
    //old_main_polygon.move(width / 2, height / 2, all_duration, 0, 0)

    var positions = main_polygon.getNeighborPositions(0.5, 0.5, poly_size);
    for (var i = 0; i < neighbors.length; i++) {
        try {
            neighbors[i].move(
                positions[i].x,
                positions[i].y,
                all_duration,
                positions[i].size,
                1
            );
        } catch (error) {
            console.error(error);
        }
    }

    // Neighboring polygons animation
    for (var old of old_neighbors) {
        if (neighbors.findIndex((x) => old.isMatching(x)) === -1) {
            old.move(
                old_main_polygon.animation.target.x,
                old_main_polygon.animation.target.y,
                all_duration,
                0,
                1
            );
        }
    }

    if (actually_new_polygons) {
        for (var prev of actually_new_polygons) {
            if (!prev.animation.active)
                prev.move(last_clicked_polygon.x, last_clicked_polygon.y, 1, 0);
        }
    }

    //preview_polygons = []
    preview_polygons_ready = false;

    updateScaleState({ setScaleData, newScale: main_polygon.scale });
};

export const changeMainScale = ({
    p5,
    new_main,
    all_duration = Helper.default_animation_duration,
    animation = false,
    setScaleData,
}) => {
    prepareChangeMainScale({ p5, p: new_main, animation });
    finishChangeMainScale({ p5, new_main, all_duration, setScaleData });
};

export const updateScaleState = ({ setScaleData, newScale }) => {
    scale = newScale;
    setScaleData(newScale);
    // window.setFirebaseScaleData(newScale);
};

export const jumpToScale = ({
    p5,
    newScale,
    setScaleData,
    setNavigatorData,
}) => {
    if (newScale !== scale) {
        updateScaleState({ newScale, setScaleData });
        initPolygons({ p5, setNavigatorData });
    }
};
