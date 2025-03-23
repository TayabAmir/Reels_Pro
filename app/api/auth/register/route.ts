import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/User"

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json(
                { error: "Please provide email and password" },
                { status: 400 }
            )
        }

        await connectToDatabase();

        const existed = await User.findOne({ email })
        if (existed) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            )
        }

        const newUser = new User({ email, password });
        await newUser.save();
        return NextResponse.json(
            { message: "User registered successfully!!" },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to register user!!" },
            { status: 500 }
        )
    }
}