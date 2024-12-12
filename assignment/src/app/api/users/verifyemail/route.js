import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connect()

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const {token} = reqBody;
        console.log(token);

        const user = User.findOne({verifyToken: token, verifytokenExpiry: {$gt: Date.now()}})

        if(!user) {
            return NextResponse.json({error: error.message}, {status: 400})
        }
        console.log(user);

        user.isVerified = true;

        await user.save();

        return NextResponse.json({
            message: "Email verified successfully!",
            success: true
        }, {status: 500})


    } catch(error) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}