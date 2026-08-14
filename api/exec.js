const GOOGLE_APPS_SCRIPT_URL =
  process.env.GOOGLE_APPS_SCRIPT_URL;

export default async function handler(req, res) {
  try {
    /*
     * ==========================================
     * GET REQUESTS
     * Used by StudentTable
     * ==========================================
     */

    if (req.method === "GET") {
      if (!GOOGLE_APPS_SCRIPT_URL) {
        return res.status(500).json({
          success: false,
          message:
            "Google Apps Script URL is not configured.",
        });
      }

      const params = new URLSearchParams(
        req.query || {}
      );

      const googleResponse = await fetch(
        `${GOOGLE_APPS_SCRIPT_URL}?${params.toString()}`,
        {
          method: "GET",
        }
      );

      const text =
        await googleResponse.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        return res.status(502).json({
          success: false,
          message:
            "Invalid response from Google Apps Script.",
        });
      }

      return res
        .status(googleResponse.status)
        .json(data);
    }


    /*
     * ==========================================
     * POST REQUESTS
     * ==========================================
     */

    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }


    const body = req.body || {};


    /*
     * ==========================================
     * STUDENT / TOTP REQUESTS
     *
     * register
     * verifyTotp
     * delete
     *
     * → Google Apps Script
     * ==========================================
     */

    if (body.action) {
      if (!GOOGLE_APPS_SCRIPT_URL) {
        return res.status(500).json({
          success: false,
          message:
            "Google Apps Script URL is not configured.",
        });
      }

      const googleResponse = await fetch(
        GOOGLE_APPS_SCRIPT_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },

          body: JSON.stringify(body),
        }
      );

      const text =
        await googleResponse.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        console.error(
          "Google Apps Script response:",
          text
        );

        return res.status(502).json({
          success: false,
          message:
            "Invalid response from Google Apps Script.",
        });
      }

      return res
        .status(googleResponse.status)
        .json(data);
    }


    /*
     * ==========================================
     * QUERY
     *
     * No action field
     *
     * → Discord
     * ==========================================
     */

    const {
      name,
      universityId,
      email,
      subject,
      message,
    } = body;


    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    if (!universityId) {
      return res.status(400).json({
        success: false,
        message:
          "University ID is required.",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!subject) {
      return res.status(400).json({
        success: false,
        message: "Problem is required.",
      });
    }

    if (!message) {
      return res.status(400).json({
        success: false,
        message:
          "Description is required.",
      });
    }


    const webhook =
      process.env.DISCORD_WEBHOOK_URL;


    if (!webhook) {
      return res.status(500).json({
        success: false,
        message:
          "Discord webhook is not configured.",
      });
    }


    const discordResponse =
      await fetch(webhook, {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          username:
            "KL RUNS Support",

          embeds: [
            {
              title: "New Query",

              color: 3447003,

              fields: [
                {
                  name: "Name",
                  value: String(name),
                  inline: true,
                },

                {
                  name: "University ID",
                  value: String(
                    universityId
                  ),
                  inline: true,
                },

                {
                  name: "Email",
                  value: String(email),
                  inline: false,
                },

                {
                  name: "Problem",
                  value: String(subject),
                  inline: false,
                },

                {
                  name: "Description",
                  value: String(message),
                  inline: false,
                },
              ],

              footer: {
                text:
                  "KL RUNS Query System",
              },

              timestamp:
                new Date().toISOString(),
            },
          ],
        }),
      });


    if (!discordResponse.ok) {
      const discordText =
        await discordResponse.text();

      console.error(
        "Discord error:",
        discordText
      );

      return res.status(502).json({
        success: false,
        message:
          "Failed to send query to Discord.",
      });
    }


    return res.status(200).json({
      success: true,
      message:
        "Query submitted successfully.",
    });

  } catch (error) {
    console.error(
      "API error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Internal server error.",
    });
  }
}