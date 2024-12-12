import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/utils/mailer";
import { getDataFromTOken } from "@/utils/getDataFromTokens";

connect();

export async function POSt(req) {
    const userId = await getDataFromTOken(req)

    const user = await User.findOne({_id: userId}).select("-password")

    return NextResponse.json({
        message: "User Found",
        data: user
    })
}