import Xmark from "../images/xmark.svg";

export default function FormLink({ state }) {
  const [link, setLink] = state;

  function createLink(event) {
    event.preventDefault();
    setLink([...link, ""]);
  }

  function onDeleteLink(event, currentLink) {
    event.preventDefault();
    const newLinks = link.filter((el) => el !== currentLink);
    setLink(newLinks);
  }

  return (
    <div className="cource-edit-block">
      <button
        onClick={(event) => createLink(event)}
        className="courseCreate-button-small "
      >
        Add link
      </button>
      {link.map((item, index) => (
        <div className="course-edit-label-block" key={item}>
          <input
            type="text"
            value={item}
            onChange={(event) =>
              setLink(
                link.map((el, i) => (i === index ? event.target.value : el))
              )
            }
          />
          <img
            src={Xmark}
            className="cource-edit-xmark"
            onClick={(event) => onDeleteLink(event, item)}
          />
        </div>
      ))}
    </div>
  );
}
