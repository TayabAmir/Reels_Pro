import { authOptions } from "@/lib/authOptions";
import { connectToDatabase } from "@/lib/db";
import Video, {IVideo} from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean()
        if (!videos || videos.length === 0) {
            return NextResponse.json([], { status: 200 })
        }
        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json({ error: "Failed to get videos" }, { status: 200 })
    }
}

export async function POST(request: NextResponse) {
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({ error: "User must be logged in" }, { status: 401 })
        }
        await connectToDatabase();
        
        const body:IVideo = await request.json(); 
        if(!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl){
            return NextResponse.json({ error: "Required Fields are missing!" }, { status: 401 })
        }
        
        const videoData = {
            ...body,
            controls: body.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100
            }
        }

        const vd = await Video.create(videoData)
        return NextResponse.json(vd)
    } catch (error) {
        return NextResponse.json({ error: "Failed to post video" }, { status: 200 })
    }
}