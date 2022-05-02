import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createFile } from "../scripts/cloudStorage";
import { getDocument, updateDocument } from "../scripts/fireStore";

export default function CourseEdit() {
  const params = useParams();
  console.log("params:", params);
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
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
      setType(data.type);
    }
    loadData(`artSchool/${params.course}`);
  }, []);

  console.log("course:", course);

  async function onUpdate(event) {
    event.preventDefault();
    const newCourse = {
      title: title,
      type: type,
      imgURL: "",
      description: description,
    };

    const fileName = `course-${title}.jpg`;
    const filePath = path + fileName;
    const imgURL = await createFile(filePath, file);

    /*if (file === null) {
      newCourse.imgURL = EmptyImg;
    } else {
      newCourse.imgURL = imgURL;
    }*/

    await updateDocument(path, course.type !== type ? course : newCourse);
    navigate(-1);
  }

  return (
    <div>
      {title}
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
        <div className="admin-label">
          <label className="admin-choose-image">Choose picture</label>
          <img
            src={file !== null ? URL.createObjectURL(file) : course.imgURL}
            className="admin-foto"
          />
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>
        <button className="admin-button" onClick={() => setFile(null)}>
          Delete picture
        </button>
        <button className="admin-button">Submit</button>
      </form>
    </div>
  );
}
