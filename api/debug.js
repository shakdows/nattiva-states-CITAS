module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  
  if (!raw) {
    return res.status(200).json({ 
      status: "ERROR", 
      problem: "Variable GOOGLE_SERVICE_ACCOUNT_JSON no existe" 
    });
  }

  const trimmed = raw.trim();
  
  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch(e) {
    return res.status(200).json({
      status: "ERROR",
      problem: "JSON inválido: " + e.message,
      starts_with: trimmed.substring(0, 100),
      ends_with: trimmed.substring(trimmed.length - 50),
      length: trimmed.length
    });
  }

  return res.status(200).json({
    status: "OK",
    type: parsed.type,
    project_id: parsed.project_id,
    client_email: parsed.client_email,
    has_private_key: !!parsed.private_key,
    private_key_starts: parsed.private_key ? parsed.private_key.substring(0, 40) : "MISSING",
    length: trimmed.length
  });
};
