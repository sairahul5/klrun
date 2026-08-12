const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwgP1EFNB2KmKkT08ryLEfV473nyKLJgj1y5ciHpoMk5r-O6pGT7ek4qgtdjGfG3D5sCw/exec";

export default async function handler(req, res) {
  try {
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    let url = GOOGLE_APPS_SCRIPT_URL;

    if (req.method === "GET") {
      const query = new URLSearchParams(
        req.query
      ).toString();

      if (query) {
        url += `?${query}`;
      }
    }

    const options = {
      method: req.method,
      redirect: "follow",
      headers: {},
    };

    if (
      req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "PATCH"
    ) {
      options.headers["Content-Type"] =
        "text/plain;charset=utf-8";

      if (typeof req.body === "string") {
        options.body = req.body;
      } else {
        options.body = JSON.stringify(
          req.body || {}
        );
      }
    }

    const response = await fetch(
      url,
      options
    );

    const text =
      await response.text();

    res.setHeader(
      "Content-Type",
      "application/json"
    );

    return res
      .status(response.status)
      .send(text);
  } catch (error) {
    console.error(
      "Apps Script proxy error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to connect to the backend.",
    });
  }
}