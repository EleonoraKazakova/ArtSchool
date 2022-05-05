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
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  const path = `artSchool/${params.course}`;

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setCourse(data);
    }
    loadData(`artSchool/${params.course}`);
  }, []);

  if (course === null) return null;
  async function onUpdate(event) {
    event.preventDefault();

    let collectedURL = [];

    for (let doc of documents) {
      if (doc === null) continue;
      let documentName = doc.name;
      let documentPath = `artSchool/${course.title}` + documentName;
      let documentURL = await createFile(documentPath, doc);
      collectedURL.push(documentURL);
    }

    if (course.imgURL === "") {
      course.imgURL = EmptyImg;
    } else if (file !== null) {
      const fileName = `course-${course.title}.jpg`;
      const filePath = path + fileName;
      const imgURL = await createFile(filePath, file);
      course.imgURL = imgURL;
    }

    await updateDocument(path, {
      ...course,
      documents: [...course.documents, ...collectedURL],
    });
    navigate(-1);
  }

  async function onDeleteLink(event, link) {
    event.preventDefault();
    const newLinks = course.link.filter((el) => el !== link);
    await updateDocument(path, { link: newLinks });
    setCourse({ ...course, link: newLinks });
  }

  async function onDeleteDocument(event, document) {
    event.preventDefault();
    const newDocuments = course.documents.filter((el) => el !== document);
    await deleteFile(document);
    await updateDocument(path, { documents: newDocuments });
    setDocuments(newDocuments);
  }

  function createLink(event) {
    event.preventDefault();
    setCourse({ ...course, link: [...course.link, ""] });
  }

  function createDocuments(event) {
    event.preventDefault();
    setDocuments([...documents, null]);
  }

  const courseDocuments = course.documents.map((doc, index) => (
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
      <h2>Edit course {course.title}</h2>
      <form onSubmit={onUpdate} className="admin-form">
        <div>
          <label>Title</label>
          <input
            placeholder="Title"
            required
            type="text"
            value={course.title}
            onChange={(event) =>
              setCourse({ ...course, title: event.target.value })
            }
          />
        </div>
        <div>
          <label>Description</label>
          <input
            placeholder="description"
            type="text"
            value={course.description}
            onChange={(event) =>
              setCourse({ ...course, description: event.target.value })
            }
          />
        </div>

        <p>Links:</p>
        {course.link.map((item, index) => (
          <>
            <input
              type="text"
              value={item}
              onChange={(e) =>
                setCourse({
                  ...course,
                  link: course.link.map((el, i) =>
                    i === index ? e.target.value : el
                  ),
                })
              }
            />
            <img
              src={Xmark}
              className="cource-edit-xmark"
              onClick={(event) => onDeleteLink(event, item)}
            />
          </>
        ))}
        <button
          onClick={(event) => createLink(event)}
          className="courseCreate-button-small "
        >
          Add link
        </button>

        <div>
          <p>Documents:</p>
          {courseDocuments}
        </div>
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
                setCourse({ ...course, imgURL: EmptyImg });
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
            src={file !== null ? URL.createObjectURL(file) : course.imgURL}
            className="course-edit-foto"
          />
        </div>

        <button className="course-edit-button">Submit</button>
      </form>
    </div>
  );
}
