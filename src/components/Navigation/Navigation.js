import Pfivesketch from './Navigator/Pfivesketch';

const Navigation = ({ p5Sketch }) => {
  return(
      <div id="Navigation">
        <div>
          <div id="title_container">scale navigator</div>
          <div id="logo">dashboard</div>
          <p id="author">by <a href="https://www.nathanturczan.com/">Nathan Turczan</a></p>
        </div>
        <div className="scalenav_container">
          { p5Sketch }
        </div>
        <div id="autopilot_container">
          <form>
            <p>autopilot checkbox</p>
          </form>
        </div>
      </div>
    );
}




export default Navigation;
