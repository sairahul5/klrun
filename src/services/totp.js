const API_URL = "/api/exec";

const REQUEST_TIMEOUT = 30000;

export async function verifyTotp(code) {
  const cleanCode = String(code).trim();

  if (!/^\d{6}$/.test(cleanCode)) {
    return {
      success: false,
      authenticated: false,
      message: "Enter a valid 6-digit code."
    };
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT);

  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },

      body: JSON.stringify({
        action: "verifyTotp",
        code: cleanCode
      }),

      redirect: "follow",

      signal: controller.signal
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status}`
      );
    }

    if (!text) {
      throw new Error(
        "Empty response from server."
      );
    }

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      throw new Error(
        "Invalid response from server."
      );
    }

    return result;

  } catch (error) {

    if (error.name === "AbortError") {
      throw new Error(
        "Verification timed out. Please try again."
      );
    }

    throw error;

  } finally {
    clearTimeout(timeout);
  }
}