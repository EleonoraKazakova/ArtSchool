import { useState, useEffect } from "react";
import "../styles/navigationBar.sass";
import { Link } from "react-router-dom";
import { authentication } from "../scripts/firesbase";
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
        <Link to="/">
          <p>Courses</p>
        </Link>
        {uid !== null && user.type === "teacher" ? (
          <Link to="/students-list">
            <p>Students</p>
          </Link>
        ) : null}
        <p className="navigationBar-user">{userName}</p>
        {uid !== null ? (
          <p onClick={() => setUID(null)}>Logout</p>
        ) : (
          <Link to="/login">
            <p>Login</p>
          </Link>
        )}
        <ExternalLink href="https://calendar.google.com/calendar/u/0/r?pli=1">
          Google
        </ExternalLink>
      </div>
    </div>
  );
}
