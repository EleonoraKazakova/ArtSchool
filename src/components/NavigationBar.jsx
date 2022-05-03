import { useState, useEffect } from "react";
import "../styles/navigationBar.sass";
import { Link } from "react-router-dom";
import { authentication } from "../scripts/firesbase";
import { getDocument } from "../scripts/fireStore";
import { useUID } from "../state/UIDProvider";
import Logo from "../images/logo.svg";

export default function NavigationBar() {
  const { uid, setUID } = useUID();

  const [user, setUser] = useState({});

  useEffect(() => {
    if (uid !== null) {
      async function loadData(path) {
        const data = await getDocument(path);
        setUser(data);
      }
      loadData(`users/${uid}`);
    }
  }, [uid]);

  const userName = uid !== null ? <p>{user.name}</p> : null;

  return (
    <div className="navigationBar-content">
      <Link to="/">
        <img src={Logo} className="navigationBar-logo" />
      </Link>
      {uid !== null && user.type === "teacher" ? (
        <Link to="/students-list">
          <p>Students</p>
        </Link>
      ) : null}
      {userName}
      {uid !== null ? (
        <p onClick={() => setUID(null)}>Logout</p>
      ) : (
        <Link to="/login">
          <p>Login</p>
        </Link>
      )}
    </div>
  );
}
