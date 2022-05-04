import { Link } from "react-router-dom";
import "../styles/welcomePage.sass";
import Welcome from "../images/welcome.jpg";

export default function WelcomePage() {
  /*<img
        src={require(`../pictures/homePage/${dish.dishImg}.jpg`)}
        className="homepage-image"
        alt={dish.altImg}
      />*/
  return (
    <div>
      <div className="welcompage-big-img ">
        <h1>Welcome</h1>
      </div>
      <p>
        Here you will find a lot of information abourt artist of different eras
      </p>
    </div>
  );
}
