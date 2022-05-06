export default function FormLink({ state }) {
  const [link, setLink] = state;

  function createLink(event) {
    event.preventDefault();
    setLink([...link, ""]);
  }

  return (
    <div>
      <button
        onClick={(event) => createLink(event)}
        className="courseCreate-button-small "
      >
        Add link
      </button>
      {link.map((item, index) => (
        <input
          type="text"
          value={item}
          onChange={(event) =>
            setLink(
              link.map((el, i) => (i === index ? event.target.value : el))
            )
          }
        />
      ))}
    </div>
  );
}
