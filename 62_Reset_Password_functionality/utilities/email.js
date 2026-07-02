const mailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create a transporter object using SMTP transport
  const transporter = mailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    },
  });


    // Define the email options
    const emailOptions = {
      from: "Joel Hanson <joel.hanson@example.com>",
      to: options.email,
      subject: options.subject,
      text: options.message
    };

    // Send the email
    await transporter.sendMail(emailOptions);
  };

module.exports = sendEmail;
