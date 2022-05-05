import { useState, useEffect } from "react";
import { getCollection } from "../scripts/fireStore";
import { Link } from "react-router-dom";
import "../styles/coursesTeacher.sass";

export default function CoursesTeacherStudents() {
  const [artCoursesTeacher, setArtCoursesTeacher] = useState([]);
  const path = "artSchool";
  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setArtCoursesTeacher(data);
    }
    loadData(path);
  }, []);

  console.log("artCoursesTeacher:", artCoursesTeacher);

  const artCourseCard = artCoursesTeacher.map((item) => (
    <div key={item.id} className="CoursesTeacher-for-teacher-card">
      <img src={item.imgURL} className="CoursesTeacher-for-teacher-img" />
      <div className="CoursesTeacher-for-teacher-card-title">
        <Link to={`/CoursesTeacher/${item.id}`}>{item.title} </Link>
      </div>
    </div>
  ));
  return (
    <div className="CoursesTeacher-for-teacher-content">
      <h2 className="CoursesTeacher-for-teacher-title">CoursesTeacher</h2>
      <div className="CoursesTeacher-for-teacher-block">{artCourseCard}</div>
    </div>
  );
}
