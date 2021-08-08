// Helper functions
import React from 'react'
import Sketch from 'react-p5'

function Helper() {

    function hsvToRgb(h, s, v) {
        var r = 0,
            g = 0,
            b = 0;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        if (i % 6 === 0) {
            r = v;
            g = t;
            b = p;
        } else if (i % 6 === 1) {
            r = q;
            g = v;
            b = p;
        } else if (i % 6 === 2) {
            r = p;
            g = v;
            b = t;
        } else if (i % 6 === 3) {
            r = p;
            g = q;
            b = v;
        } else if (i % 6 === 4) {
            r = t;
            g = p;
            b = v;
        } else if (i % 6 === 5) {
            r = v;
            g = p;
            b = q;
        }

        return [r * 255, g * 255, b * 255];
    }

}


export default Helper