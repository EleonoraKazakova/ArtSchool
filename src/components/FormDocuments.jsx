export default function FormDocuments({ state }) {
  const [documents, setDocuments] = state;
  function createDocuments(event) {
    event.preventDefault();
    setDocuments([...documents, null]);
  }

  return (
    <div>
      <button
        onClick={(event) => createDocuments(event)}
        className="courseCreate-button-small"
      >
        Add document
      </button>
      {documents.map((doc, index) => (
        <input
          className="courseCreate-documents"
          type="file"
          key={index}
          accept="application/pdf, application/doc, application/docx"
          // Nesting -5, come on, you could have created a var for this
          onChange={(event) => {
            setDocuments(
              documents.map((el, i) =>
                i === index ? event.target.files[0] : el
              )
            );
          }}
        />
      ))}
    </div>
  );
}
