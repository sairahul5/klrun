const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwgP1EFNB2KmKkT08ryLEfV473nyKLJgj1y5ciHpoMk5r-O6pGT7ek4qgtdjGfG3D5sCw/exec";

export async function verifyTotp(code) {
  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "verifyTotp",
      code: String(code).trim(),
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const text = await response.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    console.error("Invalid response from Apps Script:", text);
    throw new Error("Invalid response from server.");
  }

  return data;
}