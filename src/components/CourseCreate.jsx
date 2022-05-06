import { useState } from "react";
import { addDocument } from "../scripts/fireStore";
import { useNavigate } from "react-router-dom";
import { createFile } from "../scripts/cloudStorage";
import EmptyImg from "../images/empty.jpg";
import "../styles/courseCreate.sass";
import textToUrl from "../scripts/textToUrl";
import uploadFiles from "../scripts/uploadFile";
import InputField from "./InputField";
import createForm from "../data/createForm.json";
import FormDocuments from "./FormDocuments";
import FormLink from "./FormLink";
import FormPicture from "./FormPicture";

export default function CourseCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState([]);
  const [documents, setDocuments] = useState([]);

  function clearForm() {
    setTitle("");
    setDescription("");
    setFile(null);
  }

  async function onCreate(event) {
    event.preventDefault();
    const id = textToUrl(title);
    const collectedURL = await uploadFiles(documents, title);

    const newCourse = {
      title: title,
      id: id,
      description: description,
      imgURL: "",
      link: link,
      documents: collectedURL,
    };

    if (file === null) {
      newCourse.imgURL = EmptyImg;
    } else {
      const imgURL = await createFile(`artSchool/${file.name}`, file);
      newCourse.imgURL = imgURL;
    }

    if (newCourse.title === "") return;
    await addDocument(`artSchool/${id}`, newCourse);

    clearForm();
    navigate(-1);
  }

  return (
    <div className="courseCreate-content">
      <h1>Create course</h1>
      <form onSubmit={onCreate} className="courseCreate-form">
        <InputField setup={createForm.title} state={[title, setTitle]} />
        <InputField
          setup={createForm.description}
          state={[description, setDescription]}
        />

        <FormLink state={[link, setLink]} />
        <FormDocuments state={[documents, setDocuments]} />
        <FormPicture state={[file, setFile]} />

        <div className="courseCreate-title">
          <button className="courseCreate-button">Add course</button>
        </div>
      </form>

      <button className="courseCreate-button" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
}
