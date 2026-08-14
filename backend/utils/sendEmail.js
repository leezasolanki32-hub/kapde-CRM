import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: (process.env.CRM_EMAIL || '').trim(),
    pass: (process.env.CRM_PASS || '').trim(),
  },
});

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Kapde CRM" <${process.env.CRM_EMAIL}>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`[SMTP] Email sent successfully to ${to} ✅`);
    return info;
  } catch (error) {
    console.error(`[SMTP ERROR] Failed to send email to ${to}: ❌`);
    console.error(`Reason: ${error.message}`);
    throw error;
  }
};

export const verifySMTPConnection = () => {
  transporter.verify((error, success) => {
    console.log('[DEBUG] Checking SMTP Credentials...');
    console.log(`[DEBUG] CRM_EMAIL: ${process.env.CRM_EMAIL ? 'FOUND ✅' : 'MISSING ❌'}`);
    console.log(`[DEBUG] CRM_PASS: ${process.env.CRM_PASS ? 'FOUND ✅' : 'MISSING ❌'}`);

    if (error) {
      console.error('SMTP Connection Error ❌:', error.message);
    } else {
      console.log('SMTP Mail Connected ✅');
    }
  });
};

export const getOtpEmailTemplate = (code, userName = 'User') => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Kapde CRM Verification Code</title>
</head>
<body style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px 0; color: #1c1c1e;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #a855f7 0%, #c084fc 100%); padding: 40px 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Kapde CRM</h1>
        <p style="color: rgba(255, 255, 255, 0.85); margin: 10px 0 0 0; font-size: 15px;">Secure Verification</p>
      </td>
    </tr>
    
    <!-- Body -->
    <tr>
      <td style="padding: 40px 30px;">
        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px;">Hello ${userName},</p>
        <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 24px; color: #52525b;">To complete your login, please use the verification code below. This code is valid for the next 5 minutes.</p>
        
        <!-- OTP Box -->
        <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 25px; text-align: center; margin-bottom: 30px;">
          <span style="display: inline-block; font-family: 'Courier New', Courier, monospace; font-size: 42px; font-weight: 700; letter-spacing: 12px; color: #9333ea; margin-left: 12px;">${code}</span>
        </div>
        
        <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 22px; color: #71717a;">If you didn't attempt to log in to Kapde CRM, please ignore this email or contact our support team if you have concerns.</p>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background-color: #fafafa; padding: 25px 30px; border-top: 1px solid #f4f4f5; text-align: center;">
        <p style="margin: 0; font-size: 13px; color: #a1a1aa;">&copy; ${new Date().getFullYear()} Kapde CRM. All rights reserved.</p>
        <p style="margin: 5px 0 0 0; font-size: 13px; color: #a1a1aa;">Need help? <a href="mailto:support@kapdecrm.com" style="color: #a855f7; text-decoration: none;">Contact Support</a></p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
