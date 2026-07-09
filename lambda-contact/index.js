const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses")

const ses = new SESClient({ region: process.env.AWS_REGION })

function response(statusCode, body, origin) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "content-type"
    },
    body: JSON.stringify(body)
  }
}

exports.handler = async (event) => {
  const origin =
    event.headers?.origin ||
    event.headers?.Origin ||
    process.env.ALLOW_ORIGIN ||
    "*"

  // CORS preflight
  if (event.requestContext?.http?.method === "OPTIONS") {
    return response(204, {}, origin)
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {}

    // Honeypot spam trap
    if (body.website) {
      return response(200, { ok: true }, origin)
    }

    const name = (body.name || "").trim()
    const business = (body.business || "").trim()
    const email = (body.email || "").trim()
    const phone = (body.phone || "").trim()
    const message = (body.message || "").trim()

    if (!name || !email || !message) {
      return response(
        400,
        { ok: false, error: "Missing required fields" },
        origin
      )
    }

    const subject = `New Summit Ridge Digital lead: ${name}${
      business ? ` (${business})` : ""
    }`

    const text = [
      `Name: ${name}`,
      `Business: ${business || "-"}`,
      `Email: ${email}`,
      `Phone: ${phone || "-"}`,
      ``,
      `Message:`,
      message,
      ``,
      `Source: summitridgedigital.com`
    ].join("\n")

    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [process.env.TO_EMAIL]
      },
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: {
          Text: { Data: text, Charset: "UTF-8" }
        }
      },
      Source: process.env.FROM_EMAIL,
      ReplyToAddresses: [email]
    })

    await ses.send(command)

    return response(200, { ok: true }, origin)
  } catch (err) {
    console.error(err)
    return response(500, { ok: false, error: "Server error" }, origin)
  }
}
