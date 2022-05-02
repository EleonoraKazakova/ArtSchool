import { useState, useEffect } from "react";
import { getCollection } from "../scripts/fireStore";
import { Link } from "react-router-dom";

export default function CoursesForStudents() {
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

  const artCourseCard = artCourses.map((item) => (
    <div key={item.id}>
      <Link to={`/courses/${item.type}`}>{item.title} </Link>
      {item.description}
    </div>
  ));
  return <div>{artCourseCard}</div>;
}
