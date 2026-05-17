# Nattiva States — Formulario de Citas

Formulario de captación de clientes para asesoría inmobiliaria. Guarda los datos directamente en **Google Sheets**.

## Stack

- **Frontend**: HTML + CSS + JS puro (sin frameworks)
- **Backend**: Serverless Functions en Vercel (Node.js)
- **Base de datos**: Google Sheets vía Google Sheets API v4

## Estructura del proyecto

```
nattiva-states/
├── api/
│   └── submit.js          # Serverless function → escribe en Google Sheets
├── public/
│   └── index.html         # Formulario de citas
├── vercel.json            # Configuración de Vercel
├── package.json
└── README.md
```

## Configuración (variables de entorno)

Antes de hacer deploy, necesitas crear una **Google Service Account** y configurar el acceso al Sheet.

### 1. Crear Service Account en Google Cloud

1. Ve a [console.cloud.google.com](https://console.cloud.google.com)
2. Crea un proyecto (o usa uno existente)
3. Activa la **Google Sheets API**
4. Ve a **IAM & Admin → Service Accounts → Create Service Account**
5. Crea la cuenta y descarga el archivo JSON de credenciales

### 2. Dar acceso al Google Sheet

1. Abre el Google Sheet de Nattiva States
2. Comparte el sheet con el **email de la Service Account** (termina en `@...gserviceaccount.com`)
3. Asigna rol **Editor**

### 3. Configurar variable de entorno en Vercel

En el dashboard de Vercel, en tu proyecto:

- **Settings → Environment Variables**
- Nombre: `GOOGLE_SERVICE_ACCOUNT_JSON`
- Valor: el contenido completo del archivo JSON de credenciales

## Deploy en Vercel

```bash
# 1. Instala Vercel CLI
npm i -g vercel

# 2. Haz login
vercel login

# 3. Deploy
vercel --prod
```

## Google Sheet

- **ID del Spreadsheet**: `1KY0cjwuv71ycvWOtHuGAiQWhA_km6x5Z`
- **Hoja**: `Citas Nattiva States`

## Columnas del Sheet

| Columna | Campo |
|---------|-------|
| A | Fecha de Registro |
| B | Nombre Completo |
| C | DNI |
| D | Correo Electrónico |
| E | Teléfono |
| F | ¿Primera Vivienda? |
| G | Propósito |
| H | Financiamiento |
| I | Inicial Disponible (S/) |
| J | Presupuesto Total (S/) |
| K | Distrito de Preferencia |
| L | Cuota Mensual Aprox. (S/) |
| M | Estado Civil |
