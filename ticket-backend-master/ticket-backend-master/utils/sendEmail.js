import { createTransport } from "nodemailer";

// Configure Nodemailer with Gmail's SMTP
const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465, // SSL port for Gmail
  secure: true, // Use SSL
  auth: {
    user: "divyanshujamloki05@gmail.com", // Replace with your Gmail account
    pass: "Mayank56@", // Replace with your Gmail App Password (not your Gmail password)
  },
  connectionTimeout: 10000, // 10 seconds timeout
});

// Send email function
export const sendEmail = async (recipients, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"Support Team" <divyanshujamloki05@gmail.com>', // Replace with your Gmail address
      to: recipients.join(", "), // List of recipients
      subject: subject, // Subject line
      text: text, // Plain text body
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
