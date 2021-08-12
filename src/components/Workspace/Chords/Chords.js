import './ChordStyle.css';

const Chords = () => {
  return(
      <div id="Chords">
        <button id="sound_on_off_button"> UNMUTE sound</button>
        <div class="menu">
          <p id="chord_name" align="center"></p>
          <br />
          <p>SCALAR SUPERSETS</p>
          <div id="supersets"></div>
        </div>

        

      </div>
    );
}




export default Chords;