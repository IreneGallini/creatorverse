import { useState } from "react";

export default function CreatorForm({
  initialValues = { name: "", url: "", description: "", imageURL: "" },
  submitLabel = "Save",
  onSubmit,
}) {
  const [form, setForm] = useState(initialValues);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.url.trim() || !form.description.trim()) {
      setError("Name, URL, and description are required.");
      return;
    }
    if (!/^https?:\/\//i.test(form.url)) {
      setError("URL must start with http:// or https://");
      return;
    }

    await onSubmit(form, setError);
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} />
      </label>

      <label>
        URL
        <input name="url" value={form.url} onChange={handleChange} />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
        />
      </label>

      <label>
        Image URL (optional)
        <input name="imageURL" value={form.imageURL || ""} onChange={handleChange} />
      </label>

      <button type="submit">{submitLabel}</button>
    </form>
  );
}
