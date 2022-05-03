import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createFile } from "../scripts/cloudStorage";
import { getDocument, updateDocument } from "../scripts/fireStore";
import EmptyImg from "../images/empty.jpg";
import "../styles/courseEdit.sass";

export default function CourseEdit() {
  const params = useParams();
  console.log("params:", params);
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const path = `artSchool/${params.course}`;

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      console.log("data:", data);
      setCourse(data);

      setDescription(data.description);
      setTitle(data.title);
      setId(data.id);
    }
    loadData(`artSchool/${params.course}`);
  }, []);

  console.log("course:", course);

  async function onUpdate(event) {
    event.preventDefault();
    const newCourse = {
      title: title,
      id: id,
      imgURL: "",
      description: description,
    };

    const fileName = `course-${title}.jpg`;
    const filePath = path + fileName;
    const imgURL = await createFile(filePath, file);

    if (file === null) {
      newCourse.imgURL = EmptyImg;
    } else {
      newCourse.imgURL = imgURL;
    }

    await updateDocument(path, course.id !== id ? course : newCourse);
    navigate(-1);
  }

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
        <div className="course-edit-label">
          <div className="course-edit-label-block">
            <label className="course-edit-button" for="upload">
              Choose picture
            </label>
            <button
              className="course-edit-button "
              onClick={() => setFile(null)}
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
