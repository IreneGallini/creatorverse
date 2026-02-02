import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../client";
import CreatorForm from "../components/CreatorForm";

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    async function fetchCreator() {
      setLoading(true);
      setPageError("");

      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setPageError(error.message);
        setInitialValues(null);
      } else {
        setInitialValues({
          name: data.name ?? "",
          url: data.url ?? "",
          description: data.description ?? "",
          imageURL: data.imageURL ?? "",
        });
      }

      setLoading(false);
    }

    fetchCreator();
  }, [id]);

  async function updateCreator(form, setError) {
    const payload = {
      name: form.name,
      url: form.url,
      description: form.description,
      imageURL: form.imageURL?.trim() ? form.imageURL.trim() : null,
    };

    const { error } = await supabase.from("creators").update(payload).eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    // Go back to the creator details page
    navigate(`/creators/${id}`);
  }

  if (loading) return <p>Loading…</p>;
  if (pageError) return <p style={{ color: "crimson" }}>{pageError}</p>;
  if (!initialValues) return <p>Creator not found.</p>;

  return (
    <>
      <h1>Edit Creator</h1>

      <CreatorForm
        initialValues={initialValues}
        submitLabel="Update"
        onSubmit={updateCreator}
      />

      <p style={{ marginTop: "1rem" }}>
        <Link to={`/creators/${id}`}>← Back to details</Link>
      </p>
    </>
  );
}
