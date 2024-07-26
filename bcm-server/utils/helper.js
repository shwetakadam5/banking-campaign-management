const dayjs = require("dayjs");
const nodemailer = require("nodemailer");

module.exports = {
  calculateCustomerAge: function (customerDOB) {
    let birthDate = new Date(customerDOB);
    let todayDate = new Date();
    let customerAge = todayDate.getFullYear() - birthDate.getFullYear();
    let monthDiff = todayDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && todayDate.getDate() < birthDate.getDate())
    ) {
      customerAge--; // Adjust age if birthdate hasn't occurred this year yet
    }
    return customerAge;
  },

  sendEmailMessage: async function (emailId, emailSub, emailText) {
    
    const transporter = nodemailer.createTransport({
      // host: process.env.SMTP_HOST,
      // port: process.env.SMTP_PORT,
      // secure: false, // Use `true` for port 465, `false` for all other ports
      service: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.SMTP_MAIL,
      to: emailId,
      subject: emailSub,
      text: emailText,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      
      } else {
        console.log("Email sent: " + info.response);
       
      }
    });
    
    return ;
  },

  generatePassword: function (customerFirstName, customerDOB) {
    let birthDate = new Date(customerDOB);

    let generatedPwd = customerFirstName + birthDate.getFullYear();

    return generatedPwd;
  },
};
