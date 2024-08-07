import { Topic } from "@/domain/topic";
import { Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';
import { AdminTopicRepository } from '@/infrastructure/topic/adminTopicRepository';

const topicRepository = new AdminTopicRepository();

export async function GET(
    req: NextRequest,
    { params }: { params: { topicId: string } }
) {
    // const topic = await topicRepository.find(params.topicId);
    const topic = {
        created_at: Timestamp.now().toDate().toISOString(),
        gen: 0,
        icon_path: null,
        id: params.topicId,
        left: 0,
        name: "General",
        right: 0,
        updated_at: Timestamp.now().toDate().toISOString()
    }

    if (topic === undefined) {
        return NextResponse.json(
            { error: 'Topic not found.' },
            { status: 404 }
        );
    }

    return NextResponse.json({ topic }, { status: 200 });
}
