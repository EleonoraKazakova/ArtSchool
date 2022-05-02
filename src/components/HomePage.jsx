import "../styles/homepage.sass";
import { useUID } from "../state/UIDProvider";

export default function HomePage() {
  const { setUID } = useUID();
  return (
    <div className="homepage-content">
      <h1>It is time to study!</h1>
      <button onClick={() => setUID(null)}>Logout</button>
    </div>
  );
}
