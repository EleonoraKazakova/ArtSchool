import { useState, useEffect } from "react";
import "../styles/navigationBar.sass";
import { Link } from "react-router-dom";
import { getDocument } from "../scripts/fireStore";
import { useUID } from "../state/UIDProvider";
import Logo from "../images/logo.svg";
import { ExternalLink } from "react-external-link";

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

  console.log("uid:", uid);
  const userName = uid !== null ? <p>{user.name}</p> : null;

  return (
    <div className="navigationBar-content">
      <div className="navigationBar-left-block">
        <Link to="/">
          <img src={Logo} className="navigationBar-logo" />
        </Link>
        ArtSchool
      </div>
      <div className="navigationBar-right-block">
        {uid === null ? (
          <Link to="/login">
            <p>Login</p>
          </Link>
        ) : null}
        {uid !== null && user.type === "teacher" ? (
          <>
            <Link to="/">
              <p>Courses</p>
            </Link>
            <Link to="/students-list">
              <p>Students</p>
            </Link>
            <p onClick={() => setUID(null)}>Logout</p>
          </>
        ) : null}
        {uid !== null && user.type === "student" ? (
          <>
            <Link to="/">
              <p>Courses</p>
            </Link>

            <p onClick={() => setUID(null)}>Logout</p>
          </>
        ) : null}
        <p className="navigationBar-user">{userName}</p>

        <ExternalLink href="https://calendar.google.com/calendar/u/0/r?pli=1">
          Google
        </ExternalLink>
      </div>
    </div>
  );
}
