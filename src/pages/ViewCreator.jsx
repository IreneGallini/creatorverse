import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../client";

export default function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCreator() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
        setCreator(null);
      } else {
        setCreator(data);
      }

      setLoading(false);
    }

    fetchCreator();
  }, [id]);

  async function handleDelete() {
    const { error } = await supabase.from("creators").delete().eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    // Back to home; ShowCreators will refetch on navigation
    navigate("/", { state: { refresh: true } });
  }

  if (loading) return <p>Loading creator…</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!creator) return <p>Creator not found.</p>;

  const safeUrl =
    creator.url?.startsWith("http://") || creator.url?.startsWith("https://")
      ? creator.url
      : `https://${creator.url}`;

  return (
    <article>
      <header>
        <h1>{creator.name}</h1>
      </header>

      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          style={{
            width: "100%",
            maxHeight: "420px",
            objectFit: "cover",
            marginBottom: "1rem",
          }}
        />
      )}

      <p>
        <a href={safeUrl} target="_blank" rel="noreferrer">
          Visit channel
        </a>
      </p>

      <p>{creator.description}</p>

      <footer
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginTop: "1rem",
        }}
      >
        <Link to="/" role="button" className="secondary">
          Back
        </Link>

        <Link to={`/creators/${creator.id}/edit`} role="button">
          Edit
        </Link>

        <button onClick={handleDelete} className="contrast">
          Delete
        </button>
      </footer>
    </article>
  );
}
