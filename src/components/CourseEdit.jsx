import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createFile, deleteFile } from "../scripts/cloudStorage";
import { getDocument, updateDocument } from "../scripts/fireStore";
import EmptyImg from "../images/empty.jpg";
import "../styles/courseEdit.sass";
import { ExternalLink } from "react-external-link";
import Xmark from "../images/xmark.svg";

export default function CourseEdit() {
  const params = useParams();
  console.log("params:", params);
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(EmptyImg);
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState([]);
  const [documents, setDocuments] = useState([]);

  let collectedURL = [];
  let documentURL;

  const path = `artSchool/${params.course}`;

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      console.log("data:", data);
      setCourse(data);
      setLinks(data.link);
      setDocuments(data.documents);
      setDescription(data.description);
      setTitle(data.title);
      setId(data.id);
      setImg(data.imgURL);
    }
    loadData(`artSchool/${params.course}`);
  }, []);

  async function onUpdate(event) {
    event.preventDefault();
    const newCourse = {
      title: title,
      id: id,
      imgURL: img,
      description: description,
      link: links,
      documents: collectedURL,
    };

    for (let doc of documents) {
      let documentName = doc.name;
      let documentPath = `artSchool/${title}` + documentName;
      if (doc === null) continue;
      documentURL = await createFile(documentPath, doc);
      collectedURL.push(documentURL);
    }

    if (img === "") {
      newCourse.imgURL = EmptyImg;
    } else if (file !== null) {
      const fileName = `course-${title}.jpg`;
      const filePath = path + fileName;
      const imgURL = await createFile(filePath, file);
      newCourse.imgURL = imgURL;
    }

    await updateDocument(path, course.id !== id ? course : newCourse);
    navigate(-1);
  }

  async function onDeleteLink(event, link) {
    event.preventDefault();
    const newLinks = links.filter((el) => el !== link);
    await updateDocument(path, { link: newLinks });
    setLinks(newLinks);
  }

  async function onDeleteDocument(event, document) {
    event.preventDefault();
    const newDocuments = documents.filter((el) => el !== document);
    await deleteFile(document);
    await updateDocument(path, { documents: newDocuments });
    setDocuments(newDocuments);
  }

  function createLink(event) {
    event.preventDefault();
    setLinks([...links, ""]);
  }

  function createDocuments(event) {
    event.preventDefault();
    setDocuments([...documents, null]);
  }

  const courseLink = links.map((link, index) => (
    <div key={link}>
      <ExternalLink href={link}> {index + 1}</ExternalLink>
      <img
        src={Xmark}
        className="cource-edit-xmark"
        onClick={(event) => onDeleteLink(event, link)}
      />
    </div>
  ));

  const courseDocuments = documents.map((doc, index) => (
    <div key={doc}>
      <ExternalLink href={doc}> {index + 1} </ExternalLink>
      <img
        src={Xmark}
        className="cource-edit-xmark"
        onClick={(event) => onDeleteDocument(event, doc)}
      />
    </div>
  ));

  return (
    <div>
      <h2>Edit course {title}</h2>
      <form onSubmit={onUpdate} className="admin-form">
        <div>
          <label>Title</label>
          <input
            placeholder="Title"
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
        {links.map((item, index) => (
          <input
            type="text"
            value={item}
            onChange={(e) =>
              setLinks(
                links.map((el, i) => (i === index ? e.target.value : el))
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
              setDocuments(
                documents.map((el, indexEl) =>
                  indexEl === index ? event.target.files[0] : el
                )
              );
            }}
          />
        ))}

        <div>
          <p>Links:</p>
          {courseLink}
        </div>
        <div>
          <p>Documents:</p>
          {courseDocuments}
        </div>

        <div className="course-edit-label">
          <div className="course-edit-label-block">
            <label className="course-edit-button" for="upload">
              Choose picture
            </label>
            <button
              className="course-edit-button "
              onClick={(e) => {
                e.preventDefault();
                setFile(null);
                setImg(EmptyImg);
              }}
            >
              Delete picture
            </button>
          </div>
          <input
            type="file"
            id="upload"
            accept="image/png, image/jpeg"
            onChange={(event) => setFile(event.target.files[0])}
          />

          <img
            src={file !== null ? URL.createObjectURL(file) : img}
            className="course-edit-foto"
          />
        </div>

        <button className="course-edit-button">Submit</button>
      </form>
    </div>
  );
}
