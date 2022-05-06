import { useState, useEffect } from "react";
import { getCollection } from "../scripts/fireStore";
import { Link } from "react-router-dom";
import "../styles/coursesTeacher.sass";

export default function CoursesStudents() {
  const [courses, setCourses] = useState([]);
  const path = "artSchool";
  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCourses(data);
    }
    loadData(path);
  }, []);

  const courseCard = courses.map((item) => (
    <div key={item.id} className="courses-for-teacher-card">
      <img src={item.imgURL} className="courses-for-teacher-img" />
      <div className="courses-for-teacher-card-title">
        <Link to={`/courses/${item.id}`}>{item.title} </Link>
      </div>
    </div>
  ));

  return (
    <div className="courses-for-teacher-content">
      <h2 className="courses-for-teacher-title">Courses</h2>
      <div className="courses-for-teacher-block">{courseCard}</div>
    </div>
  );
}
