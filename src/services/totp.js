const API_URL = "/api/exec";

const TOKEN_KEY =
  "student_portal_token";

export async function verifyTotp(code) {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type":
        "text/plain;charset=utf-8",
    },

    body: JSON.stringify({
      action: "verifyTotp",
      code: code,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error: ${response.status}`
    );
  }

  const result =
    await response.json();

  if (result.success && result.token) {
    sessionStorage.setItem(
      TOKEN_KEY,
      result.token
    );
  }

  return result;
}

export function getAuthToken() {
  return sessionStorage.getItem(
    TOKEN_KEY
  );
}

export function clearAuthToken() {
  sessionStorage.removeItem(
    TOKEN_KEY
  );
}