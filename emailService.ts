import nodemailer from 'nodemailer';

// ⚠️ Use environment variables in real apps
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dev2.scwt@gmail.com',        // sender email
    pass: 'yxia tlsn abtb scyi',      // Gmail App Password
  },
});


export async function sendEmail(
    to: string,
    subject: string,
    text: string
    ): Promise<void> {
    await transporter.sendMail({
        from: 'dev2.scwt@gmail.com',
        to,
        subject,
        text,
    });

    console.log(`✅ Email sent to ${to}`);
}
