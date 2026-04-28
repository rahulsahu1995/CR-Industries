import { Router } from "express";
import sgMail from "@sendgrid/mail";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body as {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  };

  if (!name || !email || !subject || !message) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL || "info@crindustries.com";
  const templateId = process.env.SENDGRID_TEMPLATE_ID;

  if (!apiKey) {
    req.log.warn("SENDGRID_API_KEY not set — email not sent, returning success for dev");
    res.json({ message: "Message received (email delivery not configured)" });
    return;
  }

  sgMail.setApiKey(apiKey);

  const msgData: sgMail.MailDataRequired = {
    to: toEmail,
    from: { email: toEmail, name: "C R INDUSTRIES Website" },
    replyTo: { email, name },
    subject: `[Website Contact] ${subject}`,
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Subject: ${subject}

Message:
${message}
    `.trim(),
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px;">
  <div style="background: linear-gradient(135deg, #03045E, #0096C7); padding: 24px; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
    <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0 0; font-size: 13px;">C R INDUSTRIES Website</p>
  </div>
  <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 100px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #1e293b;">${name}</td></tr>
      <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Email</td><td style="padding: 8px 0; font-weight: 600; color: #0096C7;">${email}</td></tr>
      <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Phone</td><td style="padding: 8px 0; color: #1e293b;">${phone || "N/A"}</td></tr>
      <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Subject</td><td style="padding: 8px 0; font-weight: 600; color: #1e293b;">${subject}</td></tr>
    </table>
    <hr style="border: 1px solid #e2e8f0; margin: 16px 0;">
    <h3 style="color: #1e293b; margin: 0 0 8px 0;">Message</h3>
    <p style="color: #475569; line-height: 1.6; white-space: pre-wrap;">${message}</p>
  </div>
</div>
    `,
    ...(templateId ? { templateId, dynamicTemplateData: { name, email, phone, subject, message } } : {}),
  };

  try {
    await sgMail.send(msgData);
    req.log.info({ to: toEmail, from: email }, "Contact email sent");
    res.json({ message: "Message sent successfully" });
  } catch (err: unknown) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
});

export default router;
