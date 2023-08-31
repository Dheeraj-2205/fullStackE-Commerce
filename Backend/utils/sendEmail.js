const nodemailer = require("nodemailer");

// const sendEmail = async (options) =>{
//     // console.log(options);
//     const transporter = nodemailer.createTransport({
//         host : process.env.SMPT_HOST,
//         port : process.env.SMPT_PORT,
//         service : process.env.SMPT_SERVICE,
//         auth : { 
//             user : process.env.SMPT_MAIL,
//             pass : process.env.SMPT_PASSWORD
//         }
//     });

//     const mailOption = {
//         from : process.env.SMPT_MAIL,
//         to : options.email,
//         subject : options.subject,
//         text : options.message
//     }
//     await transporter.sendMail(mailOption);
  
    
// }

const sendEmail = async(to,subject,text) =>{
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "c2056e95ead9cb",
            pass: "bd6ff74dfca782"
        }
    })

    await transporter.sendMail({
        to,
        subject,
        text
    })
}



module.exports = sendEmail;