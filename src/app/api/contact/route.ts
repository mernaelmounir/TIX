import nodemailer from 'nodemailer';
import { z } from 'zod';

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  building: z.string().trim().min(1, 'Please tell us what you are building.').max(5000),
  help: z.string().trim().max(5000).optional().default(''),
  company: z.string().max(0).optional().default(''),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateEmailHtml({
  name,
  email,
  building,
  help,
}: {
  name: string;
  email: string;
  building: string;
  help?: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeBuilding = building ? escapeHtml(building).replace(/\r?\n/g, '<br>') : 'Not specified';
  const safeHelp = help ? escapeHtml(help) : '';
  const dateStr = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Inquiry - TIX</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0507; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0507; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background: linear-gradient(180deg, #18080c 0%, #0e0507 100%); border: 1px solid #3d0c13; border-radius: 20px; overflow: hidden; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.75);">
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #610000 0%, #b80d19 50%, #610000 100%);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 36px 36px 24px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
              <h1 style="margin: 0; font-size: 32px; font-weight: 900; letter-spacing: 0.14em; color: #ffffff; text-transform: uppercase;">
                TIX <span style="color: #b80d19; font-weight: 400;">STUDIO</span>
              </h1>
              <div style="display: inline-block; margin-top: 12px; padding: 4px 14px; background: rgba(184, 13, 25, 0.15); border: 1px solid rgba(184, 13, 25, 0.35); border-radius: 999px;">
                <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #ff6b77;">
                  ✦ NEW PROJECT INQUIRY ✦
                </span>
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 36px 24px;">
              <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #d4c2c5;">
                You have received a new project inquiry from the contact form on <strong style="color: #ffffff;">TIX Creative Agency</strong>.
              </p>

              <!-- Client Info Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 18px 22px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #9c8387; margin-bottom: 5px;">
                      Client Name
                    </div>
                    <div style="font-size: 18px; font-weight: 700; color: #ffffff;">
                      ${safeName}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 18px 22px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #9c8387; margin-bottom: 5px;">
                      Email Address
                    </div>
                    <div>
                      <a href="mailto:${safeEmail}" style="font-size: 16px; font-weight: 600; color: #ff4d5a; text-decoration: none;">
                        ${safeEmail}
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 18px 22px; ${safeHelp ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);' : ''}">
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #9c8387; margin-bottom: 5px;">
                      What they're building / Project Details
                    </div>
                    <div style="font-size: 15px; font-weight: 500; color: #f5f0f1; line-height: 1.6; white-space: pre-wrap;">
                      ${safeBuilding}
                    </div>
                  </td>
                </tr>
                ${safeHelp ? `
                <tr>
                  <td style="padding: 18px 22px;">
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #9c8387; margin-bottom: 5px;">
                      Requested Service / Assistance
                    </div>
                    <div style="font-size: 15px; font-weight: 600; color: #ffffff; background: rgba(184, 13, 25, 0.14); border-left: 3px solid #b80d19; padding: 12px 14px; border-radius: 6px; margin-top: 6px;">
                      ${safeHelp}
                    </div>
                  </td>
                </tr>` : ''}
              </table>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${safeEmail}?subject=Re:%20TIX%20Creative%20Agency%20%E2%80%94%20Inquiry%20from%20${encodeURIComponent(name)}" style="display: inline-block; background: linear-gradient(135deg, #8a0c16 0%, #b80d19 100%); color: #ffffff; font-size: 14px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none; padding: 16px 36px; border-radius: 50px; box-shadow: 0 10px 24px rgba(184, 13, 25, 0.45);">
                      Reply to ${safeName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px 32px; background: rgba(0, 0, 0, 0.35); border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center;">
              <p style="margin: 0 0 6px; font-size: 12px; color: #8a7377;">
                Sent via <strong style="color: #bfa8ab;">TIX Creative Agency</strong> Website Contact Form
              </p>
              <p style="margin: 0; font-size: 11px; color: #5f4c50;">
                ${dateStr} (UTC)
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > 20_000) return Response.json({ error: 'Request too large.' }, { status: 413 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || parsed.data.company) return Response.json({ error: 'Please check the form fields.' }, { status: 400 });
  const { name, email, building, help } = parsed.data;

  const gmailUser = process.env.GMAIL_USER || 'tixagency1@gmail.com';
  const gmailPass = (process.env.GMAIL_APP_PASSWORD || 'ulnw knuk bwux jtuv').replace(/\s+/g, '');
  const to = process.env.CONTACT_TO || gmailUser || 'tixagency1@gmail.com';
  const from = process.env.EMAIL_FROM || gmailUser || 'tixagency1@gmail.com';

  // Primary: Gmail SMTP
  if (gmailUser && gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      const html = generateEmailHtml({ name, email, building, help });
      const textLines = [
        `NEW PROJECT INQUIRY — TIX CREATIVE AGENCY`,
        `========================================`,
        `Client Name: ${name}`,
        `Email: ${email}`,
        `Project / What they are building:`,
        `${building}`,
      ];
      if (help) {
        textLines.push(`Requested Service: ${help}`);
      }
      const text = textLines.join('\n');

      await transporter.sendMail({
        from: `"TIX Creative Agency" <${from}>`,
        to,
        replyTo: `"${name}" <${email}>`,
        subject: `New Project Inquiry from ${name} [TIX Agency]`,
        text,
        html,
      });

      return Response.json({ ok: true });
    } catch (error) {
      console.error('Failed to deliver email via Gmail SMTP:', error);
      return Response.json({ error: 'We could not deliver your message. Please try again.' }, { status: 502 });
    }
  }

  // Fallback: Resend API if configured
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey && to && from) {
    const html = generateEmailHtml({ name, email, building, help });
    const provider = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New Project Inquiry from ${name} [TIX Agency]`,
        text: [`Name: ${name}`, `Email: ${email}`, `Building: ${building}`, '', help].join('\n'),
        html,
      }),
    });
    if (!provider.ok) return Response.json({ error: 'We could not deliver your message. Please try again.' }, { status: 502 });
    return Response.json({ ok: true });
  }

  return Response.json({ error: 'Contact delivery is not configured yet.' }, { status: 503 });
}

export function GET() {
  return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } });
}
