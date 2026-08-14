const API_URL =
  "https://script.google.com/macros/s/AKfycbwgP1EFNB2KmKkT08ryLEfV473nyKLJgj1y5ciHpoMk5r-O6pGT7ek4qgtdjGfG3D5sCw/exec";

const REQUEST_TIMEOUT = 15000;

async function request(payload) {
  if (
    !API_URL ||
    API_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"
  ) {
    throw new Error(
      "Google Apps Script URL is not configured."
    );
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    if (!text) {
      throw new Error("Empty response from server.");
    }

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Invalid response from server.");
    }

    if (data.success === false) {
      throw new Error(
        data.message || "Request failed."
      );
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "Request timed out. Please try again."
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function submitQuery({
  name,
  universityId,
  email,
  subject,
  message,
}) {
  return request({
    action: "submitQuery",
    name,
    universityId,
    email,
    subject,
    message,
  });
}