import "../styles/homepage.sass";

export default function HomePage({ uidState }) {
  const [uid, setUid] = uidState;
  return (
    <div className="homepage-content">
      <h1>It is time to study!</h1>
      <button onClick={() => setUid(null)}>Logout</button>
    </div>
  );
}
