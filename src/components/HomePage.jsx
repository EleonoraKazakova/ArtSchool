import "../styles/homepage.sass";
import { useUID } from "../state/UIDProvider";

export default function HomePage() {
  const { setUid } = useUID();
  return (
    <div className="homepage-content">
      <h1>It is time to study!</h1>
      <button onClick={() => setUid(null)}>Logout</button>
    </div>
  );
}
