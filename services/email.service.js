const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (verificationToken) => {
  const msg = {
    to: "olsavchenko1@gmail.com", // Change to your recipient
    from: "olsavchenko1@gmail.com", // Change to your verified sender
    subject: "Your verification token",
    text: "Your verification token:",
    html: `http://localhost:3000/auth/verify/${verificationToken}`,
  };
  return await sgMail.send(msg);
};

module.exports = { sendVerificationEmail };
