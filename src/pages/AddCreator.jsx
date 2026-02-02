import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../client";
import CreatorForm from "../components/CreatorForm";

export default function AddCreator() {
  const navigate = useNavigate();

  async function createCreator(form, setError) {
    const payload = {
      name: form.name,
      url: form.url,
      description: form.description,
      imageURL: form.imageURL?.trim() ? form.imageURL.trim() : null,
    };

    const { data, error } = await supabase
      .from("creators")
      .insert([payload])
      .select()
      .single();

    if (error) {
      setError(error.message);
      return;
    }

    // Navigate to the new creator's detail page
    navigate(`/creators/${data.id}`);
  }

  return (
    <>
      <h1>Add Creator</h1>
      <CreatorForm submitLabel="Create" onSubmit={createCreator} />

      <p style={{ marginTop: "1rem" }}>
        <Link to="/">← Back to list</Link>
      </p>
    </>
  );
}
