import { useState } from "react";
import { registerStudent } from "../services/googleSheets";

function RegistrationForm({ onRegistrationSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccess(false);
    setMessage("");
    setMessageType("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.gender
    ) {
      setMessage("Please fill all fields.");
      setMessageType("error");
      setSuccess(false);
      return;
    }

    try {
      setLoading(true);
      setSuccess(false);
      setMessage("");
      setMessageType("");

      const result = await registerStudent(formData);

      if (result.success) {
        setSuccess(true);
        setMessage(
          result.message || "Student registered successfully!"
        );
        setMessageType("success");

        setFormData({
          name: "",
          email: "",
          phone: "",
          gender: "",
        });

        if (onRegistrationSuccess) {
          onRegistrationSuccess();
        }
      } else {
        setSuccess(false);
        setMessage(
          result.message || "Registration failed."
        );
        setMessageType("error");
      }
    } catch (error) {
      console.error("Registration error:", error);

      setSuccess(false);
      setMessage(
        "Unable to register student. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Gender</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {message && (
          <p className={`message ${messageType}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          className={`submit-button ${
            success ? "success-button" : ""
          }`}
          disabled={loading || success}
        >
          {loading
            ? "Registering..."
            : success
            ? "Registered"
            : "Register Student"}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;