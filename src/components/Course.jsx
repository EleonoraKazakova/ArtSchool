import { useParams, useNavigate } from "react-router-dom";
import { getDocument } from "../scripts/fireStore";
import { useEffect, useState } from "react";

export default function Course() {
  const params = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({});
  console.log("params:", params);

  useEffect(() => {
    async function loadData() {
      const data = await getDocument(`artSchool/${params.course}`);
      setCourse(data);
    }
    loadData();
  }, []);
  console.log("course:", course);

  return <div>{course.title}</div>;
}
