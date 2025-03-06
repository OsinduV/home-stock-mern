// import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
// import { mailtrapClient } from "./mailtrap.config.js"

// export const sentVerificationEmail=async(email,verificationToken)=>
// {
//   const recipent=[{email}]

//   try {
    
//     const response = await mailtrapClient({
//       from: sender,
//       to: recipent,
//       subject: "verify you email",
//       html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
//       category:"Email Verification"
//     });
    

//     console.log("Email sent successfully ",response);
//   } catch (error) {
//     console.error(`Error sending verification `,error);
//     throw new Error(`Error sending verification email:${error}`)
//   }
// }