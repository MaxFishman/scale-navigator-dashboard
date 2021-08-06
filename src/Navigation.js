import Pfivesketch from './Pfivesketch';

const Navigation = () => {
  return(
      <div id="Navigation">
        <div>
          <div id="title_container">scale navigator</div>
          <div id="logo">dashboard</div>
          <p id="author">by <a href="https://www.nathanturczan.com/">Nathan Turczan</a></p>
        </div>
        <div className="scalenav_container">
          <Pfivesketch />
        </div>
        <div id="autopilot_container">
          <form>
            <p>autopilot checkbox</p>
          </form>
        </div>
        <div id="chatroom_container">
          <p>create ensemble chatroom</p>
          <p>select / join ensemble chatroom</p>
        </div>
      </div>
    );
}




export default Navigation;