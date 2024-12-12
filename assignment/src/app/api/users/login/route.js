import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log("Request body:", reqBody);

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User Does Not Exist" }, { status: 400 });
        }
        console.log("User exists:", user);

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ error: "Check Your Credentials" }, { status: 401 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Logged In Successfully",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
