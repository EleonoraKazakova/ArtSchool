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

  return (
    <section className="lougedRoutes-grid">
      <div className="lougedRoutes-content">
        <Routes>
          <Route
            path="/"
            element={
              user.type === "teacher" ? <CoursesTeacher /> : <CoursesStudents />
            }
          />
          <Route path="/:CoursesTeacher/:course" element={<Course />} />
          <Route
            path="/:CoursesTeacher/:course/edit"
            element={<CourseEdit />}
          />
          <Route path="/course-create" element={<CourseCreate />} />
          <Route path="/students-list" element={<StudentsList />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </section>
  );
}
