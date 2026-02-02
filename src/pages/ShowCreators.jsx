import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();

  async function fetchCreators() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("creators")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      setError(error.message);
      setCreators([]);
    } else {
      setCreators(data ?? []);
    }

    setLoading(false);
  }

  // Fetch once on mount, AND refetch when we navigate back here with state.refresh
  useEffect(() => {
    fetchCreators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ marginBottom: 0 }}>Creators</h1>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button type="button" className="secondary" onClick={fetchCreators}>
            Refresh
          </button>
        </div>
      </header>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && creators.length === 0 && (
        <p>No creators yet. Click “Add Creator” to create one.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {creators.map((c) => (
          <CreatorCard key={c.id} creator={c} />
        ))}
      </div>
    </>
  );
}
