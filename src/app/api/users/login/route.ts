import { connect } from "@/dbConfig/dfConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json()
        const { email, password } = reqbody
        console.log(reqbody);


        const user = await User.findOne({ email })
        console.log(user.password);

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }



        const validPassword = await bcryptjs.compare(password, user.password)
        console.log(validPassword);

        console.log("My User exist");
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        console.log(user);


        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }
        // console.log(tokenData.id);

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login Succesfully",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}