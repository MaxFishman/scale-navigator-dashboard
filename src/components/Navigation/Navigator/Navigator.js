import ChordChooser from "./ChordChooser";
import Polygon from "./Polygon";
import Helper from "./Helper";

function Navigator(setScaleData) {
    this.scale = "c_diatonic";
    this.main_polygon = undefined;
    this.neighbors = [];
    this.old_main_polygon = undefined;
    this.old_neighbors = undefined;
    this.last_clicked_polygon = undefined;
    this.actually_new_polygons = undefined;
    this.hover_polygons = [];
    this.hover_polygons_to_be_removed = [];
    this.preview_polygons = [];
    this.poly_size = 61;
    this.preview_polygons_ready = false;
    this.setScaleData = setScaleData;

    this.chord_chooser = new ChordChooser();

    this.autopilot_data = {
        active: false,
        default_period: [8000, 12000, 16000],
        period: undefined,
        chosen: undefined,
        intervalID: undefined,
        animate: true,
        max_visited: 10,
        visited: []
    };

    this.scaleDataCallback = (setScaleData) => {
        this.setScaleData = setScaleData;
    };

    this.init = (p5) => {
        this.init_autopilot(p5);

        // create the initial polygons
        this.main_polygon = new Polygon(p5, 0.5, 0.5, this.poly_size, "c_diatonic");
        this.neighbors = this.main_polygon.getNeighbors();

        this.chord_chooser.tick(this.main_polygon.scale);
        this.triggerEvent();
    };

    this.init_autopilot = (p5) => {
        if (!this.autopilot_data.period)
            this.autopilot_data.period = this.autopilot_data.default_period;

        this.autopilot_data.chosen = p5.random(this.autopilot_data.period)

        this.autopilot_data.intervalID = setInterval(
            (p5) => {
                if (this.autopilot_data.active) {
                    var p = p5.random(this.neighbors.concat(this.main_polygon));
                    var passes = 0
                    while (this.autopilot_data.visited.includes(p) && passes < 100) {
                        p = p5.random(this.neighbors.concat(this.main_polygon));
                        passes++
                    }

                    this.autopilot_data.chosen = p5.random(this.autopilot_data.period)

                    if (this.autopilot_data.visited.length >= this.autopilot_data.max_visited) {
                        this.autopilot_data.visited.pop()
                    }
                    this.autopilot_data.visited.unshift(p)

                    this.changeMainScale(
                        p5,
                        p,
                        Helper.default_animation_duration,
                        this.autopilot_data.animate
                    );

                    this.set_autopilot_period(p5, this.autopilot_data.default_period)
                    return;
                }
            },
            this.autopilot_data.chosen,
            p5
        );
    };

    this.toggle_autopilot = (forced_value = undefined) => {
        if (forced_value) {
            this.autopilot_data.active = forced_value;
        } else {
            this.autopilot_data.active = !this.autopilot_data.active;
        }
    };

    this.reset_autopilot = () => {
        this.autopilot_data.active = false;
        this.autopilot_data.visited = []
        this.set_autopilot_period(undefined);
    };

    this.set_autopilot_period = (p5, new_period) => {
        this.autopilot_data.period = new_period;

        clearInterval(this.autopilot_data.intervalID);

        this.init_autopilot(p5);
    };

    this.toggle_autopilot_animation = (forced_value = undefined) => {
        if (forced_value) {
            this.autopilot_data.animate = forced_value;
        } else {
            this.autopilot_data.animate = !this.autopilot_data.active;
        }
    };

    this.draw = (p5) => {
        p5.push();
        p5.ellipseMode(p5.RADIUS);

        //console.log(this.hover_polygons.length)
        for (var h = 0; h < this.hover_polygons.length; h++) {
            this.hover_polygons[h].draw();
        }

        //background(255);
        var allPolygons = [this.main_polygon].concat(
            this.preview_polygons,
            this.old_neighbors
        );
        allPolygons.push(...this.neighbors);
        allPolygons.push(this.old_main_polygon);

        //draw all the polygons
        for (var p of allPolygons) {
            if (p) p.draw();
        }

        this.third_gen_hover(p5);

        p5.pop();
    };

    this.mousePressed = (p5) => {
        if (this.main_polygon.click()) {
            this.chord_chooser.tick(this.main_polygon.scale);
            this.triggerEvent();
            return;
        }
        // check for clicks on all polygons
        for (var p of this.neighbors) {
            if (p && p.click() && !p.animation.active) {
                this.prepareChangeMainScale(p5, p);
                return;
            }
        }
    };

    this.mouseReleased = (p5) => {
        // check for clicks on all polygons
        for (var p of this.neighbors) {
            if (
                p &&
                p.click() &&
                !p.animation.active &&
                this.preview_polygons_ready
            ) {
                this.finishChangeMainScale(p5, p);
                return;
            }
        }
    };

    this.changeMainScaleCallbacks = [];
    this.onChangeMainScale = (callback) => {
        this.changeMainScaleCallbacks.push(callback);
    };

    this.third_gen_hover = (p5) => {
        for (var h = 0; h < this.hover_polygons_to_be_removed.length; h++) {
            this.hover_polygons.splice(this.hover_polygons_to_be_removed[h], 1);
            this.hover_polygons_to_be_removed.splice(
                this.hover_polygons_to_be_removed.indexOf(h),
                1
            );
            this.hover_polygons_to_be_removed = this.hover_polygons_to_be_removed.map(
                (x) => x - 1
            );
            h--;
        }

        for (var n of this.neighbors) {
            var clickData = n.click(p5.mouseX, p5.mouseY, true);
            if (clickData.start && !n.animation.active) {
                var add = this.get_new_neighbors(p5, n).new;
                var pos = add.map((p) => {
                    return {
                        x: p.x,
                        y: p.y,
                    };
                });

                for (var p = 0; p < add.length; p++) {
                    add[p].set(["x", n.x], ["y", n.y], ["generated_from", n]);
                    add[p].move(
                        pos[p].x,
                        pos[p].y,
                        Helper.default_animation_duration / 2
                    );
                }

                this.hover_polygons.push(...add);
            } else if (clickData.end) {
                for (var p of this.get_new_neighbors(p5, n).new) {
                    for (var h = 0; h < this.hover_polygons.length; h++) {
                        if (
                            this.hover_polygons[h].isMatching(p) &&
                            this.hover_polygons[h].generated_from == n
                        ) {
                            var _h = this.hover_polygons[h];

                            _h.move(
                                n.x,
                                n.y,
                                Helper.default_animation_duration / 2,
                                _h.radius,
                                1,
                                (id) => {
                                    this.hover_polygons_to_be_removed.push(id);
                                }, [h]
                            );
                        }
                    }
                }
            }
        }
    };

    this.prepareChangeMainScale = (p5, p, animation = false) => {
        this.last_clicked_polygon = p;

        this.hover_polygons = [];

        // convert to array
        var pl = this.get_new_neighbors(p5, p);
        this.actually_new_polygons = pl.new;
        this.preview_polygons = pl.preview;

        // take care of the fanning out (not all the way around)
        var total_poly = this.neighbors.length;
        var ind = this.main_polygon
            .getNeighbors()
            .findIndex((x) => x.isMatching(p));
        //var positions = p.getNeighborPositions(p.x, p.y, p5.RADIUS, undefined, undefined, p5.PI / 2 + (2 * p5.PI * (ind - 0.5)) / total_poly, p5.PI / 2 + (2 * p5.PI * (ind + 0.5)) / total_poly, this.actually_new_polygons.length)
        var positions = p.getNeighborPositions(
            p.x,
            p.y,
            p5.RADIUS,
            undefined,
            undefined,
            p5.PI / 2,
            p5.PI / 2 + 2 * p5.PI,
            this.actually_new_polygons.length
        );

        /*
            //position them
            for (var a_n = 0; a_n < this.actually_new_polygons.length; a_n++) {
                var pol = this.preview_polygons.find(x => this.actually_new_polygons[a_n].isMatching(x))

                pol.set(["x", positions[a_n].x], ["y", positions[a_n].y], ["size", positions[a_n].size])
            }*/

        if (animation) {
            for (var prev of this.actually_new_polygons) {
                var oldx = prev.x;
                var oldy = prev.y;

                prev.set(["x", p.x], ["y", p.y]);
                prev.move(oldx, oldy, prev.size);
            }
        }

        this.preview_polygons_ready = true;

        return;
    };

    this.get_new_neighbors = (p5, p) => {
        var prev_poly = p.getNeighbors();

        // duplicates between this.neighbors
        var all_current = this.neighbors.concat([this.main_polygon]);
        var acc_new_poly = new Set();
        for (var n = 0; n < all_current.length; n++) {
            for (var pre = 0; pre < prev_poly.length; pre++) {
                if (all_current[n].isMatching(prev_poly[pre])) {
                    prev_poly[pre] = all_current[n];
                }
            }
        }

        // find polygons which are actually new
        for (var pre = 0; pre < prev_poly.length; pre++) {
            if (!all_current.includes(prev_poly[pre])) {
                acc_new_poly.add(prev_poly[pre]);
            }
        }

        return {
            new: Array.from(acc_new_poly),
            preview: prev_poly,
        };
    };

    this.finishChangeMainScale = (
        p5,
        new_main,
        all_duration = Helper.default_animation_duration
    ) => {
        if (new_main == this.main_polygon) {
            this.chord_chooser.tick(this.main_polygon.scale);
            this.triggerEvent();
            return;
        }

        // p5.push the current polygons into old polygons
        this.old_neighbors = [...this.neighbors];
        this.old_main_polygon = this.main_polygon;

        this.main_polygon = new_main;
        this.neighbors = this.preview_polygons;

        //Handle duplicates
        this.old_neighbors.splice(this.old_neighbors.indexOf(this.main_polygon), 1);

        // duplicate of main polygon
        var index = this.neighbors.findIndex((x) => {
            return this.old_main_polygon.isMatching(x);
        });
        if (index !== -1) {
            this.neighbors[index] = this.old_main_polygon;
        }

        // Main polygons animation
        this.main_polygon.move(0.5, 0.5, all_duration, this.poly_size);
        //this.old_main_polygon.move(width / 2, height / 2, all_duration, 0, 0)

        var positions = this.main_polygon.getNeighborPositions(
            0.5,
            0.5,
            this.poly_size
        );
        for (var i = 0; i < this.neighbors.length; i++) {
            try {
                this.neighbors[i].move(
                    positions[i].x,
                    positions[i].y,
                    all_duration,
                    positions[i].size,
                    1
                );
            } catch (error) {}
        }

        // Neighboring polygons animation
        for (var old of this.old_neighbors) {
            if (this.neighbors.findIndex((x) => old.isMatching(x)) === -1) {
                old.move(
                    this.old_main_polygon.animation.target.x,
                    this.old_main_polygon.animation.target.y,
                    all_duration,
                    0,
                    1
                );
            }
        }

        if (this.actually_new_polygons) {
            for (var prev of this.actually_new_polygons) {
                if (!prev.animation.active)
                    prev.move(
                        this.last_clicked_polygon.x,
                        this.last_clicked_polygon.y,
                        1,
                        0
                    );
            }
        }

        //this.preview_polygons = []
        this.preview_polygons_ready = false;

        this.chord_chooser.tick(this.main_polygon.scale);
        this.triggerEvent();
    };

    this.changeMainScale = (
        p5,
        new_main,
        all_duration = Helper.default_animation_duration,
        animation = false
    ) => {
        this.prepareChangeMainScale(p5, new_main, animation);
        this.finishChangeMainScale(p5, new_main, all_duration);
    };

    this.triggerEvent = () => {
        document.dispatchEvent(
            new CustomEvent("scaleChanged", { detail: this.main_polygon.scale })
        );

        for (let callback of this.changeMainScaleCallbacks) {
            callback();
        }
        this.setScaleData({
            scale: this.main_polygon.scale,
            chord: this.chord_chooser.current_chord_name,
        });
    };
}

export default { Navigator };