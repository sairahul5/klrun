const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwgP1EFNB2KmKkT08ryLEfV473nyKLJgj1y5ciHpoMk5r-O6pGT7ek4qgtdjGfG3D5sCw/exec";

const REQUEST_TIMEOUT = 15000;

export async function verifyTotp(code) {
  const controller =
    new AbortController();

  const timeoutId =
    setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT);

  try {
    const response =
      await fetch(SCRIPT_URL, {
        method: "POST",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body: JSON.stringify({
          action: "verifyTotp",
          code: String(code).trim()
        }),

        signal: controller.signal
      });

    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status}`
      );
    }

    const text =
      await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        "Invalid response from server."
      );
    }

    return data;

  } catch (error) {
    if (
      error.name === "AbortError"
    ) {
      throw new Error(
        "Verification timed out. Please try again."
      );
    }

    throw error;

  } finally {
    clearTimeout(timeoutId);
  }
}