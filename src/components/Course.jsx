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
      {index + 1}
    </ExternalLink>
  ));
  const coursDocuments = documents.map((doc, index) => (
    <ExternalLink href={doc} key={doc}>
      {index + 1}
    </ExternalLink>
  ));

  return (
    <div className="course-content">
      <h2>{course.title}</h2>
      <img src={image} />
      <p>{course.description}</p>
      <div>
        <p>Links:</p>
        {coursLink}
      </div>
      <div>
        <p>Documents:</p>
        {coursDocuments}
      </div>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
}
