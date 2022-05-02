import { useState, useEffect } from "react";
import {
  getDocument,
  getCollection,
  updateDocument,
  deleteDocument,
} from "../scripts/fireStore";

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const path = "users";
  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setStudents(data.filter((student) => student.type === "student"));
    }
    loadData(path);
  }, []);

  console.log("students:", students);

  async function onDelete(event, id) {
    event.preventDefault();
    await deleteDocument(`users/${id}`);
    const newStudents = students.filter((user) => user.id !== id);
    setStudents(newStudents);
  }

  const studentsCard = students.map((item) => (
    <div key={item.name}>
      {item.name}
      <button onClick={(event) => onDelete(event, item.id)}>Delete</button>
    </div>
  ));
  return <div>{studentsCard}</div>;
}
