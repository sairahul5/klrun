export async function submitQuery(data) {
  const response = await fetch("/api/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to submit query."
    );
  }

  return result;
}