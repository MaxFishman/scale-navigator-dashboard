import ChordChooser from "./ChordChooser";
import Polygon from "./Polygon";
import Helper from "./Helper";

function Navigator() {
    this.scale = "c_diatonic";
    this.main_polygon = undefined;
    this.neighbors = [];
    this.old_main_polygon = undefined;
    this.old_neighbors = undefined;
    this.last_clicked_polygon = undefined;
    this.actually_new_polygons = undefined;;
    this.preview_polygons = [];
    this.poly_size = 75;
    this.preview_polygons_ready = false;

    this.chord_chooser = new ChordChooser();

    this.autopilot_data = {
        active: false,
        default_period: 1000,
        period: undefined,
        intervalID: undefined
    }

    this.init = (p5) => {
        this.init_autopilot()

        // create the initial polygons
        this.main_polygon = new Polygon(p5, 0.5, 0.5, this.poly_size, "c_diatonic")
        this.neighbors = this.main_polygon.getNeighbors();

        this.chord_chooser.tick(this.main_polygon.scale);
        this.triggerEvent()
    }

    this.init_autopilot = (p5) => {
        if (!this.autopilot_data.period) this.autopilot_data.period = this.autopilot_data.default_period

        this.autopilot_data.intervalID = setInterval(() => {
            if (this.autopilot_data.active) {
                var p = p5.random(this.neighbors)

                this.changeMainScale(p5, p, p5.min(1, this.autopilot_data.period / 1000))
                return
            }
        }, this.autopilot_data.period)
    }

    this.toggle_autopilot = (forced_value = undefined) => {
        if (forced_value) {
            this.autopilot_data.active = forced_value
        } else {
            this.autopilot_data.active = !this.autopilot_data.active
        }
    }

    this.reset_autopilot = () => {
        this.autopilot_data.active = false;
        this.set_autopilot_period(undefined)
    }

    this.set_autopilot_period = (new_period) => {
        this.autopilot_data.period = new_period;

        clearInterval(this.autopilot_data.intervalID)

        this.init_autopilot();
    }

    this.draw = (p5) => {
        p5.push()
        p5.ellipseMode(p5.RADIUS);

        //background(255);
        var allPolygons = [this.main_polygon].concat(this.preview_polygons, this.old_neighbors)
        allPolygons.push(...this.neighbors)
        allPolygons.push(this.old_main_polygon)

        //draw all the polygons
        for (var p of allPolygons) {
            if (p) p.draw();
        }
        p5.pop()
    }

    this.mousePressed = (p5) => {
        // check for clicks on all polygons
        for (var p of this.neighbors) {
            if (p && p.click() && !p.animation.active) {
                this.prepareChangeMainScale(p5, p);
                return
            }
        }
    }

    this.mouseReleased = (p5) => {
        // check for clicks on all polygons
        for (var p of this.neighbors) {
            if (p && p.click() && !p.animation.active && this.preview_polygons_ready) {
                this.finishChangeMainScale(p)
                return
            }
        }
    }

    this.changeMainScaleCallbacks = [];
    this.onChangeMainScale = (callback) => {
        this.changeMainScaleCallbacks.push(callback);
    };

    this.prepareChangeMainScale = (p5, p) => {
        this.preview_polygons = p.getNeighbors()
        this.last_clicked_polygon = p;

        // duplicates between this.neighbors
        var all_current = this.neighbors.concat([this.main_polygon])
        this.actually_new_polygons = new Set();
        for (var n = 0; n < all_current.length; n++) {
            for (var pre = 0; pre < this.preview_polygons.length; pre++) {
                if (all_current[n].isMatching(this.preview_polygons[pre])) {
                    this.preview_polygons[pre] = all_current[n];
                }
            }
        }

        // find polygons which are actually new
        for (var pre = 0; pre < this.preview_polygons.length; pre++) {
            if (!all_current.includes(this.preview_polygons[pre])) {
                this.actually_new_polygons.add(this.preview_polygons[pre])
            }
        }

        // convert to array
        this.actually_new_polygons = Array.from(this.actually_new_polygons)

        // take care of the fanning out (not all the way around)
        var total_poly = this.neighbors.length;
        var ind = this.main_polygon.getNeighbors().findIndex(x => x.isMatching(p))
            //var positions = p.getNeighborPositions(p.x, p.y, p5.RADIUS, undefined, undefined, p5.PI / 2 + (2 * p5.PI * (ind - 0.5)) / total_poly, p5.PI / 2 + (2 * p5.PI * (ind + 0.5)) / total_poly, this.actually_new_polygons.length)
        var positions = p.getNeighborPositions(p.x, p.y, p5.RADIUS, undefined, undefined, p5.PI / 2, p5.PI / 2 + (2 * p5.PI), this.actually_new_polygons.length)

        /*
        //position them
        for (var a_n = 0; a_n < this.actually_new_polygons.length; a_n++) {
            var pol = this.preview_polygons.find(x => this.actually_new_polygons[a_n].isMatching(x))

            pol.set(["x", positions[a_n].x], ["y", positions[a_n].y], ["size", positions[a_n].size])
        }*/

        for (var prev of this.actually_new_polygons) {
            var oldx = prev.x;
            var oldy = prev.y;

            prev.set(["x", p.x], ["y", p.y])
            prev.move(oldx, oldy, prev.size)
        }

        this.preview_polygons_ready = true;

        return
    }

    this.finishChangeMainScale = (new_main, all_duration = Helper.default_animation_duration) => {
        if (new_main == this.main_polygon) return

        // p5.push the current polygons into old polygons
        this.old_neighbors = [...this.neighbors]
        this.old_main_polygon = this.main_polygon;

        this.main_polygon = new_main
        this.neighbors = this.preview_polygons;

        //Handle duplicates
        this.old_neighbors.splice(this.old_neighbors.indexOf(this.main_polygon), 1)

        // duplicate of main polygon
        var index = this.neighbors.findIndex((x) => { return this.old_main_polygon.isMatching(x) });
        if (index !== -1) {
            this.neighbors[index] = this.old_main_polygon;
        }

        // Main polygons animation
        this.main_polygon.move(0.5, 0.5, all_duration, this.poly_size);
        //this.old_main_polygon.move(width / 2, height / 2, all_duration, 0, 0)

        var positions = this.main_polygon.getNeighborPositions(0.5, 0.5, this.poly_size)
        for (var i = 0; i < this.neighbors.length; i++) {
            try {
                this.neighbors[i].move(positions[i].x, positions[i].y, all_duration, positions[i].size, 1)
            } catch (error) {}
        }

        // Neighboring polygons animation
        for (var old of this.old_neighbors) {
            if (this.neighbors.findIndex(x => old.isMatching(x)) === -1) {
                old.move(this.old_main_polygon.animation.target.x, this.old_main_polygon.animation.target.y, all_duration, 0, 1)
            }
        }

        if (this.actually_new_polygons) {
            for (var prev of this.actually_new_polygons) {
                if (!prev.animation.active) prev.move(this.last_clicked_polygon.x, this.last_clicked_polygon.y, 1, 0)
            }
        }

        //this.preview_polygons = []
        this.preview_polygons_ready = false;

        this.chord_chooser.tick(this.main_polygon.scale);

        this.triggerEvent();
    }

    this.changeMainScale = (new_main, all_duration = Helper.default_animation_duration) => {
        this.prepareChangeMainScale(new_main)
        this.finishChangeMainScale(new_main, all_duration)
    }

    this.triggerEvent = () => {
        document.dispatchEvent(new CustomEvent("scaleChanged", { detail: this.main_polygon.scale }))

        for (let callback of this.changeMainScaleCallbacks) {
            callback();
        }
    }
}

export default { Navigator }