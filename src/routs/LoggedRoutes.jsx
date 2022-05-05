import { Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";
import { authentication } from "../scripts/firesbase";
import { getDocument } from "../scripts/fireStore";
import { useState, useEffect } from "react";
import Courses from "../components/Courses";
import Course from "../components/Course";
import CourseEdit from "../components/CourseEdit";
import CourseCreate from "../components/CourseCreate";
import StudentsList from "../components/StudentsList";
import CoursesForStudents from "../components/CoursesForStudents";
import "../styles/lougedRoutes.sass";

export default function LoggedRoutes() {
  const currentUser = authentication.currentUser.uid;
  console.log("currentUser:", currentUser);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadData(path) {
      const data = await getDocument(path);
      setUser(data);
    }
    loadData(`users/${currentUser}`);
  }, []);

  console.log("user:", user);

  return (
    <div className="lougedRoutes-grid">
      <div className="lougedRoutes-content">
        <Routes>
          <Route
            path="/"
            element={
              user.type === "teacher" ? <Courses /> : <CoursesForStudents />
            }
          />
          <Route path="/:courses/:course" element={<Course />} />
          <Route path="/:courses/:course/edit" element={<CourseEdit />} />
          <Route path="/course-create" element={<CourseCreate />} />
          <Route path="/students-list" element={<StudentsList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </div>
  );
}
