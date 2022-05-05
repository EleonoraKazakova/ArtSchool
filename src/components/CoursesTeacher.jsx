import { useState, useEffect } from "react";
import { getCollection, deleteDocument } from "../scripts/fireStore";
import { Link } from "react-router-dom";
import "../styles/coursesTeacher.sass";
import Pen from "../images/pen.svg";
import Plus from "../images/plus.svg";
import Trash from "../images/trash.svg";

export default function CoursesTeacher() {
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

  async function onDelete(event, id) {
    event.preventDefault();
    await deleteDocument(`artSchool/${id}`);
    const newCoursesTeacher = artCoursesTeacher.filter(
      (course) => course.id !== id
    );
    setArtCoursesTeacher(newCoursesTeacher);
  }

  const artCourseCard = artCoursesTeacher.map((item) => (
    <div key={item.id} className="CoursesTeacher-for-teacher-card">
      <img src={item.imgURL} className="CoursesTeacher-for-teacher-img" />
      <Link to={`/CoursesTeacher/${item.id}`}>{item.title} </Link>

      <div className="CoursesTeacher-for-teacher-edit">
        <Link to={`/CoursesTeacher/${item.id}/edit`}>
          <div className="tooltip">
            <img src={Pen} className="CoursesTeacher-for-teacher-icon" />
            <div className="tooltiptext">Edit</div>
          </div>
        </Link>

        <button
          onClick={(event) => onDelete(event, item.id)}
          className="tooltip"
        >
          <img src={Trash} className="CoursesTeacher-for-teacher-icon" />
          <div className="tooltiptext">Delete</div>
        </button>
      </div>
    </div>
  ));

  return (
    <div className="CoursesTeacher-for-teacher-content">
      <h2 className="CoursesTeacher-for-teacher-title">Our CoursesTeacher</h2>
      <div className="CoursesTeacher-for-teacher-block">
        {artCourseCard}
        <Link to="/course-create">
          <button className="CoursesTeacher-for-teacher-empty">
            <img src={Plus} className="CoursesTeacher-for-teacher-icon" />
            Add new course
          </button>
        </Link>
      </div>
    </div>
  );
}
