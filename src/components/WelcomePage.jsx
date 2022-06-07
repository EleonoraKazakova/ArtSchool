import "../styles/welcomePage.sass";
import ArtistsData from "../data/artistsData.json";

export default function WelcomePage() {
  const artists = ArtistsData.artists.map((artist, index) => (
    <div key={artist.name} className="welcompage-block">
      <img
        src={require(`../images/${artist.img}`)}
        className="welcompage-img"
        alt={artist.alt}
      />
      <div className="welcompage-block-text">
        <h3>{artist.name}</h3>
        <p>{artist.text}</p>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="welcompage-big-img ">
        <h1 className="welcompage-title">We will talk about art...</h1>
      </div>
      <h2 className="welcompage-content">
        Here you will find a lot of information abourt artist of different eras
      </h2>
      <div className="welcompage-content">{artists}</div>
    </div>
  );
}
