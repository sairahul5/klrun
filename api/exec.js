const GOOGLE_APPS_SCRIPT_URL =
  process.env.GOOGLE_APPS_SCRIPT_URL;

export default async function handler(
  req,
  res
) {
  try {
    if (!GOOGLE_APPS_SCRIPT_URL) {
      return res.status(500).json({
        success: false,
        message:
          "GOOGLE_APPS_SCRIPT_URL is not configured.",
      });
    }

    if (
      req.method !== "GET" &&
      req.method !== "POST"
    ) {
      return res.status(405).json({
        success: false,
        message:
          "Method not allowed.",
      });
    }

    let url =
      GOOGLE_APPS_SCRIPT_URL;

    if (req.method === "GET") {
      const params =
        new URLSearchParams(
          req.query || {}
        ).toString();

      if (params) {
        url += `?${params}`;
      }
    }

    const options = {
      method: req.method,
      redirect: "follow",
      headers: {},
    };

    if (req.method === "POST") {
      options.headers[
        "Content-Type"
      ] =
        "text/plain;charset=utf-8";

      options.body =
        typeof req.body === "string"
          ? req.body
          : JSON.stringify(
              req.body || {}
            );
    }

    const response =
      await fetch(
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
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Backend connection failed.",
    });
  }
}