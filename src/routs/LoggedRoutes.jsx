import { Routes, Route } from "react-router-dom";
import LogIn from "../components/authentication/LogIn";
import SignUp from "../components/authentication/SignUp";
import { authentication } from "../scripts/firesbase";
import { getDocument } from "../scripts/fireStore";
import { useState, useEffect } from "react";
import CoursesTeacher from "../components/CoursesTeacher";
import Course from "../components/Course";
import CourseEdit from "../components/CourseEdit";
import CourseCreate from "../components/CourseCreate";
import StudentsList from "../components/StudentsList";
import CoursesStudents from "../components/CoursesStudents";
import "../styles/lougedRoutes.sass";

export default function LoggedRoutes() {
  const currentUser = authentication.currentUser.uid;
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setUser(data);
    }
    loadData(`users/${currentUser}`);
  }, []);

  // Properties
  const homeRoute =
    user.type === "teacher" ? <CoursesTeacher /> : <CoursesStudents />;

  return (
    <section className="lougedRoutes-grid">
      <div className="lougedRoutes-content">
        <Routes>
          {/* Nesting -1, use a properties to pass the final result, see example */}
          <Route path="/" element={homeRoute} />
          <Route path="/:CoursesTeacher/:course" element={<Course />} />
          <Route
            path="/:CoursesTeacher/:course/edit"
            element={<CourseEdit />}
          />
          <Route path="/course-create" element={<CourseCreate />} />
          <Route path="/students-list" element={<StudentsList />} />
        </Routes>
      </div>
    </section>
  );
}
