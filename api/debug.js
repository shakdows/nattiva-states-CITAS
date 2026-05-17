const { google } = require("googleapis");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON.trim();
    const credentials = JSON.parse(raw);
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Try to read the sheet
    const result = await sheets.spreadsheets.get({
      spreadsheetId: "1YpBJWYbRKDVLgDIgYAeAVIVulN0sjlwZQ3qRL5OuH5M",
    });

    return res.status(200).json({
      status: "CONEXION OK",
      sheet_title: result.data.properties.title,
      sheets: result.data.sheets.map(s => s.properties.title),
    });

  } catch (err) {
    return res.status(200).json({
      status: "ERROR",
      message: err.message,
      code: err.code,
      errors: err.errors || null,
    });
  }
};
