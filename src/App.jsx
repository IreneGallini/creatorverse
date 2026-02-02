import { useEffect, useState } from "react";
import { Link, useRoutes } from "react-router-dom";
import { supabase } from "./client";

import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";

export default function App() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchCreators();
  }, []);

  const routes = useRoutes([
    {
      path: "/",
      element: (
        <ShowCreators
          creators={creators}
          loading={loading}
          error={error}
          onRefresh={fetchCreators}
        />
      ),
    },
    { path: "/new", element: <AddCreator onDone={fetchCreators} /> },
    { path: "/creators/:id", element: <ViewCreator onDone={fetchCreators} /> },
    { path: "/creators/:id/edit", element: <EditCreator onDone={fetchCreators} /> },
  ]);

  return (
    <div className="container" style={{ paddingTop: "1rem" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ fontWeight: 700, textDecoration: "none" }}>
          Creatorverse
        </Link>
        <Link to="/new" role="button">
          + Add Creator
        </Link>
      </nav>

      {routes}
    </div>
  );
}
