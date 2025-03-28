import mongoose from "mongoose";

export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920
} as const;

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    createdAt?: Date;
    controls?: Boolean;
    transformation?: {
        width: number;
        height: number;
        quality: number;
    }
}

const videoSchema = new mongoose.Schema<IVideo>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: false },
    transformation: {
        width: { type: Number, default: VIDEO_DIMENSIONS.width },
        height: { type: Number, default: VIDEO_DIMENSIONS.height },
        quality: { type: Number, min: 1, max: 100 }
    }
}, { timestamps: true });

const Video = mongoose.models?.video || mongoose.model<IVideo>("Video", videoSchema);
export default Video;