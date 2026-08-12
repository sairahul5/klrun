import { useState } from "react";
import { verifyTotp } from "../services/totp";

function TotpVerification({ onVerified }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanCode = code.replace(/\D/g, "");

    if (cleanCode.length !== 6) {
      setError("Enter a valid 6-digit code.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await verifyTotp(cleanCode);

      if (result.success && result.token) {
        sessionStorage.setItem(
          "student_portal_token",
          result.token
        );

        onVerified(result.token);
      } else {
        setError(
          result.message || "Invalid authentication code."
        );
      }
    } catch (error) {
      console.error("TOTP verification error:", error);
      setError("Unable to verify the code.");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (event) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setCode(value);
    setError("");
  };

  return (
    <div className="totp-card">
      <div className="totp-header">
        <h2>Verify Access</h2>

        <p>
          Enter the 6-digit code from your
          authenticator app.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="totp-code">
            Authentication Code
          </label>

          <input
            id="totp-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={handleCodeChange}
            placeholder="000000"
            disabled={loading}
            autoFocus
          />
        </div>

        {error && (
          <div className="message error">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={loading || code.length !== 6}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}

export default TotpVerification;