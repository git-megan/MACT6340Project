import nodemailer from "nodemailer";

export async function sendMessage(sub, txt) {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10), // int type
    secure: process.env.MAIL_SECURE === "true", // boolean type
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    requireTLS: process.env.MAIL_TLS === "true", // boolean type
  });

  let message = {
    from: process.env.MESSAGE_FROM,
    to: process.env.MESSAGE_TO,
    subject: sub,
    text: txt,
  };

  await transporter
    .sendMail(message)
    .then(() => {
      console.log("Message sent");
    })
    .catch((err) => {
      console.log("Message not sent:", err);
    });
}
