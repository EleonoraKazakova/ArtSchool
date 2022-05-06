import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createFile } from "../scripts/cloudStorage";
import { getDocument, updateDocument } from "../scripts/fireStore";
import EmptyImg from "../images/empty.jpg";
import "../styles/courseEdit.sass";
import { ExternalLink } from "react-external-link";
import Xmark from "../images/xmark.svg";
import uploadFiles from "../scripts/uploadFile";
import FormDocuments from "./FormDocuments";
import FormLink from "./FormLink";
import StatusError from "./status/StatusError";
import StatusLoading from "./status/StatusLoading";

export default function CourseEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(1);

  const [course, setCourse] = useState(null);
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [link, setLink] = useState([]);

  const path = `artSchool/${params.course}`;

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setCourse(data);
      setLink(data.link);
    }
    loadData(`artSchool/${params.course}`);
  }, []);

  if (course === null) return null;

  async function onUpdate(event) {
    try {
      event.preventDefault();

      const collectedURL = await uploadFiles(documents, course.title);

      if (course.imgURL === "") {
        course.imgURL = EmptyImg;
      } else if (file !== null) {
        const imgURL = await createFile(
          `course-${course.title}/${file.name}`,
          file
        );
        course.imgURL = imgURL;
      }

      setStatus(0);

      await updateDocument(path, {
        ...course,
        link: link,
        documents: [...course.documents, ...collectedURL],
      });
      navigate(-1);
    } catch (error) {
      console.error("There was an error:", error);
      setStatus(2);
    }
  }

  async function onDeleteDocument(event, document) {
    event.preventDefault();
    const newDocuments = course.documents.filter((el) => el !== document);

    setCourse({ ...course, documents: newDocuments });
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
      {status === 0 && <StatusLoading />}
      {status === 1 && (
        <>
          <h2 className="course-edit-title">Edit course {course.title}</h2>
          <form onSubmit={onUpdate} className="course-edit-label-form">
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

            <FormLink state={[link, setLink]} />

            <div>
              <p>Documents:</p>
              {courseDocuments}
            </div>

            <FormDocuments state={[documents, setDocuments]} />

            <div className="course-edit-label">
              <div className="course-edit-label-block">
                <label className="course-edit-button" htmlFor="upload">
                  Choose picture
                </label>
                <button
                  className="course-edit-button"
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
            <div className="course-edit-title">
              <button className="course-edit-button">Submit</button>
            </div>
          </form>
        </>
      )}
      {status === 2 && <StatusError />}
    </div>
  );
}
