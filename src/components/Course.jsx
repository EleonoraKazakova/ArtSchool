import { useParams, useNavigate, Link } from "react-router-dom";
import { getDocument } from "../scripts/fireStore";
import { useEffect, useState } from "react";
import "../styles/course.sass";
import CourseCreate from "./CourseCreate";
import { ExternalLink } from "react-external-link";

export default function Course() {
  const params = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({});
  const [links, setLinks] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [image, setImage] = useState("");
  console.log("params:", params);

  useEffect(() => {
    async function loadData() {
      const data = await getDocument(`artSchool/${params.course}`);
      setCourse(data);
      setLinks(data.link);
      setDocuments(data.documents);
      setImage(data.imgURL);
    }
    loadData();
  }, []);

  const coursLink = links.map((link, index) => (
    <ExternalLink href={link} key={link}>
      Link {index + 1}
    </ExternalLink>
  ));
  const coursDocuments = documents.map((doc, index) => (
    <ExternalLink href={doc} key={doc}>
      Document {index + 1}
    </ExternalLink>
  ));

  return (
    <div className="course-content">
      <h2 className="cource-title">{course.title}</h2>
      <div className="course-block">
        <img src={image} className="course-img" />
        <div className="course-block-right">
          <p className="course-text">{course.description}</p>
          <div>
            <p className="course-link">Links:</p>
            {coursLink}
          </div>
          <div>
            <p className="course-link">Documents:</p>
            {coursDocuments}
          </div>
        </div>
      </div>
      <button onClick={() => navigate(-1)} className="course-button">
        Go back
      </button>
    </div>
  );
}
