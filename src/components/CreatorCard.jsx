import { Link } from "react-router-dom";

export default function CreatorCard({ creator }) {
  return (
    <article>
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          style={{ width: "100%", height: "180px", objectFit: "cover" }}
        />
      )}

      <h3 style={{ marginTop: "0.75rem" }}>{creator.name}</h3>

      <p>
        <a href={creator.url} target="_blank" rel="noreferrer">
          Visit channel
        </a>
      </p>

      <p>{creator.description}</p>

      <footer style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <Link to={`/creators/${creator.id}`} role="button">
          View
        </Link>
        <Link to={`/creators/${creator.id}/edit`} role="button" className="secondary">
          Edit
        </Link>
      </footer>
    </article>
  );
}
