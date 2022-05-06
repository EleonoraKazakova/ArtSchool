import EmptyImg from "../images/empty.jpg";
import "../styles/formPicture.sass";

export default function FormPicture({ state }) {
  const [file, setFile] = state;

  return (
    <div>
      <div className="courseCreate-buttons-block">
        <label className="courseCreate-button-small" for="formPicture-upload">
          Choose image
        </label>
        <button
          className="courseCreate-button-small "
          onClick={() => setFile(null)}
        >
          Delete picture
        </button>
      </div>
      <img
        src={file !== null ? URL.createObjectURL(file) : EmptyImg}
        className="courseCreate-img"
      />
      <input
        type="file"
        accept="image/png, image/jpeg"
        id="formPicture-upload"
        className="formpicture-input"
        onChange={(event) => setFile(event.target.files[0])}
      />
    </div>
  );
}
