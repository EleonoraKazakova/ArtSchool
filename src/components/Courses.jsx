import { useState, useEffect } from "react";
import { getCollection, deleteDocument } from "../scripts/fireStore";
import { Link } from "react-router-dom";
import "../styles/coursesForTeachers.sass";
import Pen from "../images/pen.svg";
import Plus from "../images/plus.svg";
import Trash from "../images/trash.svg";

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
    <div key={item.id} className="courses-for-teacher-card">
      <img src={item.imgURL} className="courses-for-teacher-img" />
      <Link to={`/courses/${item.id}`}>{item.title} </Link>

      <div className="courses-for-teacher-edit">
        <Link to={`/courses/${item.id}/edit`}>
          <div className="tooltip">
            <img src={Pen} className="courses-for-teacher-icon" />
            <div className="tooltiptext">Edit</div>
          </div>
        </Link>

        <button
          onClick={(event) => onDelete(event, item.id)}
          className="tooltip"
        >
          <img src={Trash} className="courses-for-teacher-icon" />
          <div className="tooltiptext">Delete</div>
        </button>
      </div>
    </div>
  ));

  return (
    <div className="courses-for-teacher-content">
      <h2 className="courses-for-teacher-title">Our courses</h2>
      <div className="courses-for-teacher-block">
        {artCourseCard}
        <Link to="/course-create">
          <button className="courses-for-teacher-empty">
            <img src={Plus} className="courses-for-teacher-icon" />
            Add new course
          </button>
        </Link>
      </div>
    </div>
  );
}
