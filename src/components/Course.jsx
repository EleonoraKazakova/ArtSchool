import { useParams, useNavigate } from "react-router-dom";
import { getDocument } from "../scripts/fireStore";
import { useEffect, useState } from "react";

export default function Course() {
  const params = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getDocument(
        `artSchool/courses/${params.course}/content`
      );
      setCourse(data);
    }
    loadData();
  }, []);

  return (
    <div>
      {course.title}, {course.content}
    </div>
  );
}
