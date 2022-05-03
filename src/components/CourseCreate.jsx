import { useState, useEffect } from "react";
import { addDocument, getCollection } from "../scripts/fireStore";
import { useParams, Link, useNavigate } from "react-router-dom";
import { createFile } from "../scripts/cloudStorage";
import EmptyImg from "../images/empty.jpg";
import "../styles/courseCreate.sass";

export default function CourseCreate() {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [courses, setCourses] = useState([]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  //const [content, setContent] = useState("");
  const [link, setLink] = useState([]);

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
    const id = title.toLowerCase();
    const newCourse = {
      title: title,
      id: id,
      description: description,
      imgURL: "",
      link: link,
    };

    const fileName = `course-${title}.jpg`;
    const filePath = "artSchool" + fileName;
    const imgURL = await createFile(filePath, file);

    if (file === null) {
      newCourse.imgURL = EmptyImg;
    } else {
      newCourse.imgURL = imgURL;
    }

    if (newCourse.title === "") return;
    await addDocument(`artSchool/${id}`, newCourse);

    clearForm();
    navigate(-1);
  }

  function createLink() {
    setLink([...link, ""]);
  }

  return (
    <div className="admin-grid">
      <h1>Create course</h1>
      <form onSubmit={onCreate} className="admin-form">
        <button onClick={createLink}>Create link</button>
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
        <div>
          <label for="url">Add link</label>
          <input
            type="text"
            id="url"
            onChange={(event) => setLink(event.target.value)}
          />
          <label className="courseCreate-button" for="url">
            Add more links
          </label>
        </div>
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
        {/*<div>
          <label for="url">Link</label>
          <input
            type="text"
            id="url"
            onChange={(event) => setLink(event.target.value)}
          />
          <label className="courseCreate-button" for="url">
            Add more links
          </label>
  </div>*/}

        <div className="admin-label">
          <label className="courseCreate-button" for="upload">
            Choose image
          </label>
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
        <button className="admin-button" onClick={() => setFile(null)}>
          Delete picture
        </button>

        <button className="admin-button">Add course</button>
      </form>

      <button className="admin-button" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
}
