const { google } = require("googleapis");

const SPREADSHEET_ID = "1KY0cjwuv71ycvWOtHuGAiQWhA_km6x5Z";
const SHEET_NAME = "Citas Nattiva States";

function getAuth() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const {
      nombre, dni, correo, telefono,
      primeraVivienda, proposito, financiamiento,
      inicial, presupuesto, distrito, cuota, estadoCivil,
    } = req.body;

    const now = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

    const row = [
      now,
      nombre || "",
      dni || "",
      correo || "",
      telefono || "",
      primeraVivienda || "",
      proposito || "",
      financiamiento || "",
      inicial || "",
      presupuesto || "",
      distrito || "",
      cuota || "",
      estadoCivil || "",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:M`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return res.status(200).json({ success: true, message: "Cita registrada correctamente" });
  } catch (err) {
    console.error("Error al guardar en Sheets:", err);
    return res.status(500).json({ error: "Error al guardar en Google Sheets", detail: err.message });
  }
};
