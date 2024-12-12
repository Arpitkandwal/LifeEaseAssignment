import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function GET(req) {
    try {
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true
        })
        
        return response;

    } catch(error) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}