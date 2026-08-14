const GOOGLE_APPS_SCRIPT_URL =
  process.env.GOOGLE_APPS_SCRIPT_URL;

export default async function handler(req, res) {
  try {

    if (!GOOGLE_APPS_SCRIPT_URL) {
      return res.status(500).json({
        success: false,
        message:
          "GOOGLE_APPS_SCRIPT_URL is missing."
      });
    }


    /*
     * GET
     * Students
     */
    if (req.method === "GET") {

      const params =
        new URLSearchParams(
          req.query || {}
        );

      const response =
        await fetch(
          `${GOOGLE_APPS_SCRIPT_URL}?${params.toString()}`
        );

      const text =
        await response.text();

      try {

        return res
          .status(response.status)
          .json(JSON.parse(text));

      } catch {

        return res.status(502).json({
          success: false,
          message:
            "Invalid response from Google Apps Script.",
          raw: text
        });
      }
    }


    /*
     * POST
     */
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed."
      });
    }


    const body =
      req.body || {};

    const action =
      String(
        body.action || ""
      ).trim();


    /*
     * Google Sheets actions
     */
    if (
      action === "register" ||
      action === "verifyTotp" ||
      action === "delete" ||
      action === "submitQuery"
    ) {

      const response =
        await fetch(
          GOOGLE_APPS_SCRIPT_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify(body)
          }
        );

      const text =
        await response.text();


      try {

        const data =
          JSON.parse(text);

        return res
          .status(response.status)
          .json(data);

      } catch {

        return res.status(502).json({
          success: false,
          message:
            "Invalid response from Google Apps Script.",
          raw: text
        });
      }
    }


    /*
     * Anything else is invalid
     */
    return res.status(400).json({
      success: false,
      message:
        "Invalid POST action: " +
        action
    });

  } catch (error) {

    console.error(
      "API error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message
    });
  }
}