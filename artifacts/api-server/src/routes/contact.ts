import { Router, type IRouter } from "express";
import sgMail from "@sendgrid/mail";
import { z } from "zod";

const router: IRouter = Router();

/* ── Validation ─────────────────────────────────────────────── */
/* Strips CR/LF from any string field to defeat header-injection
   attempts on values that flow into mail headers (Subject, Reply-To name). */
const safeLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120).transform(safeLine),
  email: z.string().trim().toLowerCase().email("Please enter a valid email").max(254),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(200).transform(safeLine),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
});

/* ── Helpers ────────────────────────────────────────────────── */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(s: string): string {
  return escapeHtml(s).replace(/\r?\n/g, "<br>");
}

function buildEmail(data: z.infer<typeof ContactSchema>) {
  const { name, email, phone, subject, message } = data;
  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const text = [
    "═══════════════════════════════════════════════",
    "  NEW CONTACT FORM SUBMISSION",
    "  C R INDUSTRIES — Website Inquiry",
    "═══════════════════════════════════════════════",
    "",
    `Submitted: ${submittedAt} (IST)`,
    "",
    "── CONTACT DETAILS ──────────────────────────",
    `Name      : ${name}`,
    `Email     : ${email}`,
    `Phone     : ${phone && phone.length > 0 ? phone : "Not provided"}`,
    "",
    "── INQUIRY ──────────────────────────────────",
    `Subject   : ${subject}`,
    "",
    "── MESSAGE ──────────────────────────────────",
    message,
    "",
    "─────────────────────────────────────────────",
    `Reply directly to this email to respond to ${name} <${email}>.`,
    "",
    "C R INDUSTRIES",
    "102, Badi Bhamori, Indore, Madhya Pradesh, India",
    "+91 95222 22196 · +91 91652 12323",
  ].join("\n");

  const phoneRow = phone && phone.length > 0
    ? `<a href="tel:${escapeHtml(phone.replace(/\s+/g, ""))}" style="color:#0096C7;text-decoration:none;font-weight:600;">${escapeHtml(phone)}</a>`
    : `<span style="color:#94a3b8;font-style:italic;">Not provided</span>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>New Contact Form Submission — C R INDUSTRIES</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#1e293b;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New inquiry from ${escapeHtml(name)} — ${escapeHtml(subject)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(15,23,42,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#03045E 0%,#0096C7 100%);padding:32px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.75);">C R Industries · Website</p>
                    <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.01em;">New Contact Form Submission</h1>
                    <p style="margin:8px 0 0 0;font-size:13px;color:rgba(255,255,255,0.85);">${escapeHtml(submittedAt)} · IST</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Details -->
          <tr>
            <td style="padding:28px 36px 8px 36px;">
              <p style="margin:0 0 14px 0;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#0096C7;">Contact Details</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
                <tr>
                  <td style="padding:14px 18px;background:#f8fafc;border-bottom:1px solid #e2e8f0;width:110px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Name</td>
                  <td style="padding:14px 18px;border-bottom:1px solid #e2e8f0;font-size:15px;font-weight:600;color:#0f172a;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Email</td>
                  <td style="padding:14px 18px;border-bottom:1px solid #e2e8f0;font-size:15px;"><a href="mailto:${escapeHtml(email)}" style="color:#0096C7;text-decoration:none;font-weight:600;">${escapeHtml(email)}</a></td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;background:#f8fafc;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Phone</td>
                  <td style="padding:14px 18px;font-size:15px;">${phoneRow}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Subject -->
          <tr>
            <td style="padding:24px 36px 0 36px;">
              <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#0096C7;">Subject</p>
              <p style="margin:0;font-size:18px;font-weight:700;color:#0f172a;line-height:1.4;">${escapeHtml(subject)}</p>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:24px 36px 8px 36px;">
              <p style="margin:0 0 10px 0;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#0096C7;">Message</p>
              <div style="background:#f8fafc;border-left:3px solid #0096C7;border-radius:8px;padding:18px 20px;font-size:15px;line-height:1.65;color:#334155;">${nl2br(message)}</div>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:24px 36px 32px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#0096C7;border-radius:10px;">
                    <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent("Re: " + subject)}" style="display:inline-block;padding:13px 28px;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:0.02em;">Reply to ${escapeHtml(name.split(/\s+/)[0] ?? name)}</a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0 0;font-size:12px;color:#94a3b8;">Or simply hit Reply — this email is set to reply directly to <span style="color:#475569;font-weight:600;">${escapeHtml(email)}</span>.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:22px 36px;text-align:center;">
              <p style="margin:0 0 4px 0;font-size:13px;font-weight:700;color:#03045E;letter-spacing:0.04em;">C R INDUSTRIES</p>
              <p style="margin:0;font-size:12px;color:#64748b;line-height:1.6;">102, Badi Bhamori, Indore, Madhya Pradesh, India<br>+91 95222 22196 &nbsp;·&nbsp; +91 91652 12323 &nbsp;·&nbsp; crindustries21@gmail.com</p>
            </td>
          </tr>

        </table>
        <p style="margin:14px 0 0 0;font-size:11px;color:#94a3b8;">This message was sent from the contact form on the C R INDUSTRIES website.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { text, html };
}

/* ── Route ──────────────────────────────────────────────────── */
router.post("/contact", async (req, res) => {
  // Validate input
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    res.status(400).json({
      message: firstIssue?.message ?? "Invalid form data",
      field: firstIssue?.path?.join(".") ?? null,
    });
    return;
  }
  const data = parsed.data;

  // Configuration
  const apiKey   = process.env.SENDGRID_API_KEY;
  const toEmail  = process.env.CONTACT_EMAIL ?? "rahul.sahu1995@gmail.com";
  const fromEmail = process.env.SENDGRID_FROM_EMAIL ?? "crindustries21@gmail.com";

  if (!apiKey) {
    req.log.warn(
      { to: toEmail },
      "SENDGRID_API_KEY not set — accepting submission without sending email (development mode)",
    );
    // Acknowledge in dev so the form UX is testable end-to-end.
    res.json({
      message: "Message received. Email delivery is not yet configured.",
      delivered: false,
    });
    return;
  }

  sgMail.setApiKey(apiKey);

  const { text, html } = buildEmail(data);

  const msg: sgMail.MailDataRequired = {
    to: toEmail,
    from: { email: fromEmail, name: "C R INDUSTRIES Website" },
    replyTo: { email: data.email, name: data.name },
    subject: `[Website Contact] ${data.subject}`,
    text,
    html,
    trackingSettings: {
      clickTracking: { enable: false, enableText: false },
      openTracking: { enable: false },
    },
    mailSettings: {
      sandboxMode: { enable: process.env.SENDGRID_SANDBOX === "true" },
    },
  };

  try {
    await sgMail.send(msg);
    req.log.info(
      { to: toEmail, from: fromEmail, replyTo: data.email, subject: data.subject },
      "Contact email sent",
    );
    res.json({ message: "Message sent successfully", delivered: true });
  } catch (err: unknown) {
    /* Log only structured status + error codes/messages.
       The full `response.body` is included in development for diagnosis,
       but suppressed in production to avoid surfacing PII or provider
       internals to log aggregators. */
    type SgError = {
      message?: string;
      code?: number;
      response?: { body?: { errors?: Array<{ message?: string; field?: string | null }> } };
    };
    const sgErr = err as SgError;
    const errorSummaries = sgErr?.response?.body?.errors?.map((e) => ({
      field: e.field ?? null,
      message: e.message,
    }));

    const logPayload: Record<string, unknown> = {
      code: sgErr?.code,
      message: sgErr?.message,
      sendgridErrors: errorSummaries,
    };
    if (process.env.NODE_ENV !== "production") {
      logPayload["body"] = sgErr?.response?.body;
    }

    req.log.error(logPayload, "Failed to send contact email via SendGrid");

    res.status(502).json({
      message:
        "We couldn't deliver your message right now. Please try again in a moment, or email us directly at crindustries21@gmail.com.",
    });
  }
});

export default router;
