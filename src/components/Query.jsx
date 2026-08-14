import { useState } from "react";
import { submitQuery } from "../services/api";

function Query() {
  const [form, setForm] = useState({
    name: "",
    universityId: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      await submitQuery(form);

      setSuccess(
        "Your query has been submitted successfully."
      );

      setForm({
        name: "",
        universityId: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.message ||
          "Unable to submit your query. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="query-page">
      <div className="query-heading">
        <h1>Have a Problem?</h1>

        <p>
          Tell us about your problem and our team
          will look into it.
        </p>
      </div>

      <form
        className="query-card"
        onSubmit={handleSubmit}
      >
        <div className="query-field">
          <label htmlFor="name">
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="query-field">
          <label htmlFor="universityId">
            University ID
          </label>

          <input
            id="universityId"
            name="universityId"
            type="text"
            value={form.universityId}
            onChange={handleChange}
            placeholder="Enter your university ID"
          />
        </div>

        <div className="query-field">
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="query-field">
          <label htmlFor="subject">
            Problem
          </label>

          <input
            id="subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            placeholder="What is the problem?"
            required
          />
        </div>

        <div className="query-field">
          <label htmlFor="message">
            Description
          </label>

          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Explain the problem..."
            rows="6"
            required
          />
        </div>

        {error && (
          <div className="query-error">
            {error}
          </div>
        )}

        {success && (
          <div className="query-success">
            {success}
          </div>
        )}

        <button
          type="submit"
          className="query-submit"
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : "Submit Query"}
        </button>
      </form>
    </section>
  );
}

export default Query;