import { useState, useEffect } from "react";
import {
  getDocument,
  getCollection,
  updateDocument,
  deleteDocument,
} from "../scripts/fireStore";
import { Link } from "react-router-dom";

export default function Courses() {
  const [artCourses, setArtCourses] = useState([]);
  const path = "artSchool";
  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setArtCourses(data);
    }
    loadData(path);
  }, []);

  console.log("artCourses:", artCourses);

  async function onDelete(event, id) {
    event.preventDefault();
    await deleteDocument(`artSchool/${id}`);
    const newCourses = artCourses.filter((course) => course.id !== id);
    setArtCourses(newCourses);
  }

  const artCourseCard = artCourses.map((item) => (
    <div key={item.id}>
      <Link to={`/courses/${item.type}`}>{item.title} </Link>
      {item.description}
      <button>
        <Link to={`/courses/${item.type}/edit`}>Edit</Link>
      </button>
      <button onClick={(event) => onDelete(event, item.id)}>Delete</button>
    </div>
  ));
  return (
    <div>
      <but>
        <Link to="/students-list">Students</Link>
      </but>
      {artCourseCard}

      <button>
        <Link to="/course-create">Add</Link>
      </button>
    </div>
  );
}
