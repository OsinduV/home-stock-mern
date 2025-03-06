import nodemailer from "nodemailer";
import {VERIFICATION_EMAIL_TEMPLATE,WELCOME_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplates.js"

export const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"HomeStock" <homestock@gmail.com>`,
    to: options.email,
    subject: options.subject,
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      options.verificationToken
    ),
    category: options.category,
  };

  await transport.sendMail(mailOptions);
};


export const sendWelcomeEmail = async (options) => {


const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: `"HomeStock" <homestock@gmail.com>`,
  to: options.email,
  subject: options.subject,
 html: WELCOME_EMAIL_TEMPLATE
  .replace("{username}", options.username)
  .replace("{email}", options.email),

  category: options.category,
};

await transport.sendMail(mailOptions);




};


export const sendPasswordResetEmail = async(options)=>
{
 

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: `"HomeStock" <homestock@gmail.com>`,
  to: options.email,
  subject: options.subject,
  html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", options.resetURL),

  category: options.category,
};

await transport.sendMail(mailOptions);




}

export const sendResetSuccessEmail=async(options)=>

  {


    

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: `"HomeStock" <homestock@gmail.com>`,
  to: options.email,
  subject: "Password Reset Successful",
  html:PASSWORD_RESET_SUCCESS_TEMPLATE,
  category:"Password Reset"
};

await transport.sendMail(mailOptions);



  }
// import { MailtrapTransport } from "mailtrap";

// // Mailtrap API token
// const TOKEN = "cae40ce14fc2c994bfbafebaa744ccde";
// console.log(TOKEN)
// // Create a Nodemailer transport using Mailtrap
// const transport = nodemailer.createTransport(
//   MailtrapTransport({
//     token: TOKEN,
//   })
// );

// // Sender details (use a valid email address)
// export const mailtrapClient = {
//   address: "hello@demomailtrap.com", // Replace with a valid email
//   name: "ITP PROJECT HOMESTOCK",
// };

// // Function to send an email to a specific recipient
// const sendEmail = (recipientEmail) => {
//   transport
//     .sendMail({
//       from: mailtrapClient,
//       to: recipientEmail, // Dynamically set the recipient's email
//       subject: "You are awesome!",
//       text: "Congrats for sending test email with Mailtrap!",
//       category: "Integration Test",
//     })
//     .then((info) => {
//       console.log("Email sent successfully!");
//       console.log("Message ID:", info.messageId);
//     })
//     .catch((error) => {
//       console.error("Error sending email:", error);
//     });
// };

// // Example: Send an email to a specific recipient
// const recipientEmail = "akilasuppliers@gmail.com"; // Replace with any email address
// sendEmail(recipientEmail);
