import { useState, useEffect } from "react";
import { getDocument, getCollection } from "../scripts/fireStore";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState({ subCategories: [] });
  const [artCourses, setArtCourses] = useState([]);

  useEffect(() => {
    const path = "artSchool";
    async function loadData(path) {
      const data = await getCollection(path);
      setArtCourses(data);
    }
    loadData(path);
  }, []);

  console.log("artCourses:", artCourses);

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setCourses(data);
    }
    loadData("artSchool/courses");
  }, []);

  const artCourseCard = artCourses.map((item) => (
    <div>
      <Link to={`/courses/${item.type}`}>{item.title} </Link>
      {item.description}
      <button>
        <Link to={`/courses/${item.type}/edit`}>Edit</Link>
      </button>
      <button>Delete</button>
    </div>
  ));
  return (
    <div>
      {artCourseCard}

      <but>Add</but>
    </div>
  );
}
