import nodemailer from 'nodemailer';

export const sendOTPEmail = async (email: string, code: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"DigiMeds Security" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your DigiMeds Account',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Verify your DigiMeds Account</title>
        </head>
        <body style="background-color: #e1eef3; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px 0; margin: 0;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #A7D6E9; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                  <tr>
                    <td align="center" style="background-color: #A7D6E9; padding: 30px 20px;">
                      <h1 style="color: #d4d47b; margin: 0; font-size: 26px; letter-spacing: 1px; font-weight: 800;">DigiMeds</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 700;">Welcome aboard! 👋</h2>
                      <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">
                        Thank you for joining DigiMeds. To complete your registration and secure your health inventory, please use the verification code below:
                      </p>
                      <div style="background-color: #f0fdfa; border: 2px dashed #A7D6E9; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 30px;">
                        <span style="font-size: 38px; font-weight: 800; letter-spacing: 12px; color: #A7D6E9; margin-left: 12px;">
                          ${code}
                        </span>
                      </div>
                      <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin-bottom: 0;">
                        This secure code will expire in <strong style="color: #0f172a;">10 minutes</strong>. If you didn't request this email, you can safely ignore it.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="background-color: #f8fafc; padding: 20px; border-top: 1px solid #e2e8f0;">
                      <p style="color: #94a3b8; font-size: 12px; margin: 0; line-height: 1.5;">
                        &copy; ${new Date().getFullYear()} DigiMeds. All rights reserved.<br>
                        Secure Health Inventory Management
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;

  } catch (error) {
    console.error("Nodemailer Error:", error);
    throw new Error("Failed to send email");
  }
};