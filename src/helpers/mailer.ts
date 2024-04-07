import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"

export const sendEmail = async ({ email, emailtype, userId }: any) => {
  
  
  try {
    //hashed token for get token in mail.
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)
    if (emailtype === "VERIFY") {
      await User.findByIdAndUpdate(userId,
        {
          $set: { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
        }
      )
    }

    else if (emailtype === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }
      })
    }

 var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9b73cc6a6c6aec", //❌
        pass: "45f7cd36197717" //❌
      }
      //TODO: add these credentials to .env file
    });
    const mailOptions = {
      from: 'tejas@tejas.ai', // sender address
      to: email, // list of receivers
      subject: emailtype === "VERIFY" ? "Verify email" : "Reset your email password", // Subject line
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
       to ${emailtype === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser.
       <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`
    }
    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse;
  }
  catch (error: any) {
    throw new Error(error.message)
  }
}