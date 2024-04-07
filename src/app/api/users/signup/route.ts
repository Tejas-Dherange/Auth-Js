import { connect } from "@/dbConfig/dfConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        //validation
        console.log(reqBody);

        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User already exist" }, { status: 500 })
        }

        var salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            username,
            password: hashedPassword,
            email
        })
        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification mail
        await sendEmail({ email, emailtype: "VERIFY", userId: savedUser._id })
//    console.log(savedUser._id);
   
        return NextResponse.json({
            message: "User registered succesfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}