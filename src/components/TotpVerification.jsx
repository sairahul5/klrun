import { useState } from "react";
import { verifyTotp } from "../services/totp";

const TOKEN_KEY = "student_portal_token";

function TotpVerification({ onVerified }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    if (!/^\d{6}$/.test(code)) {
      setError("Enter a valid 6-digit authentication code.");
      return;
    }

    setLoading(true);

    try {
      const result = await verifyTotp(code);

      if (
        !result ||
        !result.success ||
        !result.token
      ) {
        setError(
          result?.message ||
            "Authentication failed."
        );
        return;
      }

      sessionStorage.setItem(
        TOKEN_KEY,
        result.token
      );

      setCode("");

      if (typeof onVerified === "function") {
        onVerified(result.token);
      }
    } catch (error) {
      setError(
        error.message ||
          "Unable to verify the code."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="totp-card">
      <h2>Verify Access</h2>

      <p>
        Enter the 6-digit code from your
        authenticator app.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="totp-code">
            Authentication Code
          </label>

          <input
            id="totp-code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            value={code}
            onChange={(event) => {
              const value =
                event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6);

              setCode(value);
              setError("");
            }}
            autoComplete="one-time-code"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="message error">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={
            loading ||
            code.length !== 6
          }
        >
          {loading
            ? "Verifying..."
            : "Verify"}
        </button>
      </form>
    </div>
  );
}

export default TotpVerification;