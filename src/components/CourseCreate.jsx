import { useState, useEffect } from "react";
import { addDocument, getCollection } from "../scripts/fireStore";
import { useParams, Link, useNavigate } from "react-router-dom";
import { createFile } from "../scripts/cloudStorage";
import EmptyImg from "../images/empty.jpg";
import "../styles/courseCreate.sass";
import textToUrl from "../scripts/textToUrl";

export default function CourseCreate() {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [courses, setCourses] = useState([]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState([]);
  const [documents, setDocuments] = useState([]);
  let collectedURL = [];
  let documentURL;

  useEffect(() => {
    const path = `artSchool`;
    async function loadData(path) {
      const data = await getCollection(path);
      setCourses(data);
    }
    loadData(path);
  }, []);

  function clearForm() {
    setTitle("");
    setDescription("");
    setFile(null);
  }

  async function onCreate(event) {
    event.preventDefault();
    const id = textToUrl(title);
    const newCourse = {
      title: title,
      id: id,
      description: description,
      imgURL: "",
      link: link,
      documents: collectedURL,
    };

    const fileName = `course-${title}.jpg`;
    const filePath = "artSchool/" + fileName;
    const imgURL = await createFile(filePath, file);

    for (let doc of documents) {
      let documentName = doc.name;
      let documentPath = `artSchool/${title}` + documentName;
      if (doc === null) continue;
      console.log("doc:", doc);
      documentURL = await createFile(documentPath, doc);
      collectedURL.push(documentURL);
    }
    console.log("collectedURL:", collectedURL);

    if (file === null) {
      newCourse.imgURL = EmptyImg;
    } else {
      newCourse.imgURL = imgURL;
    }
    console.log("documents:", documents);
    if (newCourse.title === "") return;
    await addDocument(`artSchool/${id}`, newCourse);

    clearForm();
    navigate(-1);
  }

  function createLink(event) {
    event.preventDefault();
    setLink([...link, ""]);
  }

  function createDocuments(event) {
    event.preventDefault();
    setDocuments([...documents, null]);
  }

  return (
    <div className="courseCreate-content">
      <h1>Create course</h1>
      <form onSubmit={onCreate} className="courseCreate-form">
        <div>
          <label>Title</label>
          <input
            placeholder="title"
            required
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            placeholder="description"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

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
                link.map((el, indexEl) =>
                  indexEl === index ? event.target.value : el
                )
              )
            }
          />
        ))}

        <button
          onClick={(event) => createDocuments(event)}
          className="courseCreate-button-small "
        >
          Add document
        </button>
        {documents.map((doc, index) => (
          <input
            type="file"
            key={index}
            accept="application/pdf, application/doc, application/docx"
            onChange={(event) => {
              console.log("event:", event);
              setDocuments(
                documents.map((el, indexEl) =>
                  indexEl === index ? event.target.files[0] : el
                )
              );
            }}
          />
        ))}

        <div className="admin-label">
          <div className="courseCreate-buttons-block">
            <label className="courseCreate-button-small " for="upload">
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
            id="upload"
            accept="image/png, image/jpeg"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>
        <button className="courseCreate-button">Add course</button>
      </form>

      <button className="courseCreate-button" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
}
