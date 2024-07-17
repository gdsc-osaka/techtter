import {TopicRepository} from "@/infrastructure/topic/topicRepository";
import {NextResponse} from "next/server";

const topicRepository = new TopicRepository();

export async function GET() {
    try {
        const topics = await topicRepository.findMany();
        return NextResponse.json({topics: topics}, {status: 200});
    } catch (e) {
        return NextResponse.error();
    }
}
