import { connect } from "@/dbConfig/dfConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

import { getDatafromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request: NextRequest) {

    try {
        const userId = getDatafromToken(request)
        const user = await User.findOne({ _id: userId }).select("-password")
        return NextResponse.json({
            message: "User found",
            data: user
        })

    } catch (error) {
        return NextResponse.json({ error: "some error occured" }, { status: 400 })
    }


}