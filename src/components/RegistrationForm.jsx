import { useState } from "react";
import { registerStudent } from "../services/googleSheets";

function RegistrationForm({
  onRegistered
}) {
  const [formData, setFormData] =
    useState({
      universityId: "",
      name: "",
      email: "",
      phone: "",
      gender: ""
    });

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  const handleChange = (
    event
  ) => {
    const {
      name,
      value
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value
      })
    );
  };


  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setMessage("");
    setError("");


    if (
      !formData.universityId.trim()
    ) {
      setError(
        "University ID is required."
      );
      return;
    }


    if (
      !formData.name.trim()
    ) {
      setError(
        "Full name is required."
      );
      return;
    }


    if (
      !formData.email.trim()
    ) {
      setError(
        "Email is required."
      );
      return;
    }


    if (
      !formData.phone.trim()
    ) {
      setError(
        "Phone number is required."
      );
      return;
    }


    if (!formData.gender) {
      setError(
        "Gender is required."
      );
      return;
    }


    try {
      setLoading(true);

      const result =
        await registerStudent(
          formData
        );


      if (result.success) {

        setMessage(
          result.message ||
            "Student registered successfully."
        );


        setFormData({
          universityId: "",
          name: "",
          email: "",
          phone: "",
          gender: ""
        });


        if (onRegistered) {
          onRegistered();
        }

      } else {

        setError(
          result.message ||
            "Unable to register student."
        );
      }

    } catch (error) {

      setError(
        error.message ||
          "Unable to register student. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="page-content">

      <h1>
        Student Registration
      </h1>

      <p className="page-description">
        Register a new student by
        filling in the form below.
      </p>


      <form
        className="registration-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label htmlFor="universityId">
            University ID
          </label>

          <input
            id="universityId"
            name="universityId"
            type="text"
            placeholder="Enter university ID"
            value={
              formData.universityId
            }
            onChange={
              handleChange
            }
          />

        </div>


        <div className="form-group">

          <label htmlFor="name">
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter student name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
          />

        </div>


        <div className="form-group">

          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
          />

        </div>


        <div className="form-group">

          <label htmlFor="phone">
            Phone
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter phone number"
            value={
              formData.phone
            }
            onChange={
              handleChange
            }
          />

        </div>


        <div className="form-group">

          <label htmlFor="gender">
            Gender
          </label>

          <select
            id="gender"
            name="gender"
            value={
              formData.gender
            }
            onChange={
              handleChange
            }
          >

            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>


        {error && (
          <div className="message error">
            {error}
          </div>
        )}


        {message && (
          <div className="message success">
            {message}
          </div>
        )}


        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Registering..."
            : "Register Student"}
        </button>

      </form>

    </div>
  );
}

export default RegistrationForm;