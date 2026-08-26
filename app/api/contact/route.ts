import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema, sanitizeHtml } from "@/lib/validations/contact";
import { checkRateLimit } from "@/lib/rate-limiter";
import { ContactApiResponse } from "@/types/contact";

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & Rate Limiting to prevent DDoS and spam flooding
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const cfIp = req.headers.get("cf-connecting-ip");
    const clientIp =
      (forwardedFor ? forwardedFor.split(",")[0].trim() : null) ||
      realIp ||
      cfIp ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(clientIp, 5, 10 * 60 * 1000); // 5 messages per 10 mins
    if (!rateLimit.success) {
      const waitSeconds = Math.ceil((rateLimit.reset - Date.now()) / 1000);
      return NextResponse.json<ContactApiResponse>(
        {
          success: false,
          message: `Too many submissions. Please wait ${waitSeconds}s before trying again.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": waitSeconds.toString(),
          },
        }
      );
    }

    // 2. Request body parsing and Zod validation
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json<ContactApiResponse>(
        {
          success: false,
          message: "Invalid request payload.",
        },
        { status: 400 }
      );
    }

    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json<ContactApiResponse>(
        {
          success: false,
          message: "Validation failed. Please verify your form inputs.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, roleType, message, honeypot } = validationResult.data;

    // 3. Honeypot check (Bot Trap)
    // If a bot fills the hidden honeypot field, return 200 silently without dispatching email
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json<ContactApiResponse>({
        success: true,
        message: "Message dispatched successfully.",
      });
    }

    // 4. Validate mail environment configuration
    const mailUser = process.env.MAIL_USER;
    const mailPassword = process.env.MAIL_PASSWORD;

    if (!mailUser || !mailPassword) {
      console.error(
        "[Contact API] Error: MAIL_USER or MAIL_PASSWORD environment variables are missing."
      );
      return NextResponse.json<ContactApiResponse>(
        {
          success: false,
          message:
            "Email service is currently unconfigured. Please contact directly via email.",
        },
        { status: 503 }
      );
    }

    const recipientEmail =
      process.env.MAIL_TO || "leeryan307@gmail.com";
    const mailHost = process.env.MAIL_HOST;
    const mailPort = process.env.MAIL_PORT
      ? parseInt(process.env.MAIL_PORT, 10)
      : undefined;

    // 5. Create Nodemailer transporter
    const transporter = nodemailer.createTransport(
      mailHost
        ? {
            host: mailHost,
            port: mailPort || 465,
            secure: mailPort === 465 || !mailPort,
            auth: {
              user: mailUser,
              pass: mailPassword,
            },
          }
        : {
            service: "gmail",
            auth: {
              user: mailUser,
              pass: mailPassword,
            },
          }
    );

    // Sanitize user inputs for HTML rendering
    const safeName = sanitizeHtml(name);
    const safeEmail = sanitizeHtml(email);
    const safeRoleType = sanitizeHtml(roleType);
    const safeMessage = sanitizeHtml(message).replace(/\n/g, "<br/>");
    const userAgent = req.headers.get("user-agent") || "Unknown Device";
    const timestamp = new Date().toUTCString();

    const mailOptions = {
      from: `"Portfolio Contact - ${name}" <${mailUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `[Portfolio Inquiry] ${roleType} - ${name}`,
      text: `New Portfolio Inquiry:\n\nFrom: ${name} (${email})\nTopic: ${roleType}\nTime: ${timestamp}\nIP: ${clientIp}\n\nMessage:\n${message}\n`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0d1117; color: #e6edf3; margin: 0; padding: 24px; }
              .container { max-width: 600px; margin: 0 auto; background-color: #161b22; border: 1px solid #30363d; border-radius: 8px; overflow: hidden; }
              .header { background: linear-gradient(135deg, #1f6feb 0%, #0d419d 100%); padding: 20px 24px; color: #ffffff; }
              .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
              .header p { margin: 4px 0 0 0; font-size: 13px; opacity: 0.9; }
              .content { padding: 24px; }
              .field-row { margin-bottom: 16px; }
              .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #8b949e; margin-bottom: 4px; font-weight: 600; font-family: monospace; }
              .field-value { font-size: 14px; color: #f0f6fc; font-weight: 500; }
              .message-box { background-color: #0d1117; border: 1px solid #30363d; border-radius: 6px; padding: 16px; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #e6edf3; }
              .meta-footer { border-top: 1px solid #21262d; padding: 16px 24px; font-size: 11px; color: #6e7681; font-family: monospace; }
              .reply-btn { display: inline-block; background-color: #238636; color: #ffffff !important; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; font-size: 13px; margin-top: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Direct Inquiry</h2>
                <p>Received via portfolio contact form</p>
              </div>
              <div class="content">
                <div class="field-row">
                  <div class="field-label">Sender Name</div>
                  <div class="field-value">${safeName}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Email Address</div>
                  <div class="field-value"><a href="mailto:${safeEmail}" style="color: #58a6ff;">${safeEmail}</a></div>
                </div>
                <div class="field-row">
                  <div class="field-label">Inquiry / Topic</div>
                  <div class="field-value" style="color: #7ee787;">${safeRoleType}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Message Content</div>
                  <div class="message-box">${safeMessage}</div>
                </div>
                <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(
        safeRoleType
      )}" class="reply-btn">Reply to ${safeName}</a>
              </div>
              <div class="meta-footer">
                <div>Timestamp: ${timestamp}</div>
                <div>Sender IP: ${clientIp}</div>
                <div>User Agent: ${userAgent}</div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json<ContactApiResponse>({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("[Contact API] Failed to send email:", error);
    return NextResponse.json<ContactApiResponse>(
      {
        success: false,
        message:
          "Failed to dispatch message due to a mail service error. Please reach out directly.",
      },
      { status: 500 }
    );
  }
}
