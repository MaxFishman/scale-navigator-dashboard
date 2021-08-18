import Pfivesketch from './Navigator/Pfivesketch';
import React, { useEffect } from "react";



const Navigation = ({ p5Sketch }) => {
  return(
      <div id="Navigation">
        <div>
          <div id="title_container">scale navigator</div>
          <div id="logo">dashboard</div>
          <p id="author">by <a href="https://www.nathanturczan.com/">Nathan Turczan</a></p>
        </div>
        <div className="scalenav_container" id="canv_container">
          { p5Sketch }
        </div>
        <div id="autopilot_container">
          <form>
            <label>Autopilot</label>
            <input type="checkbox" autoComplete="off" id="autopilot_checkbox"></input>
          </form>
        </div>
      </div>
    );
}




export default Navigation;
