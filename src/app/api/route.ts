import { NextRequest, NextResponse } from "next/server";
import {Admin} from "@/server/firebase-admin";

export async function GET(request: NextRequest) {
    try {
        const users = await Admin.auth.listUsers(10);
        console.log(users);
        return NextResponse.json({users: users});
    } catch (e) {
        console.error(e);
        return NextResponse.json({error: "ERROR"}, {status: 500});
    }
}

export function POST(request: NextRequest): NextResponse {
    return new NextResponse();
}
