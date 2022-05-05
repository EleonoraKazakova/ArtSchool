import { useState, useEffect } from "react";
import { getCollection, deleteDocument } from "../scripts/fireStore";
import "../styles/studentsList.sass";

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

  async function onDelete(event, id) {
    event.preventDefault();
    await deleteDocument(`users/${id}`);
    const newStudents = students.filter((user) => user.id !== id);
    setStudents(newStudents);
  }

  const studentsCard = students.map((item, index) => (
    <div key={item.name} className="studentslist-block">
      <p className="studentslist-name">
        {index + 1}. {item.name}
      </p>
      <button
        onClick={(event) => onDelete(event, item.id)}
        className="button-small"
      >
        Delete
      </button>
    </div>
  ));

  return (
    <div className="studentslist-grid">
      <div className="studentslist-content">
        <h2>Students</h2>
        {studentsCard}
      </div>
    </div>
  );
}
