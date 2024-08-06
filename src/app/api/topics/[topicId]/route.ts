import { NextRequest, NextResponse } from 'next/server';
import { AdminTopicRepository } from '@/infrastructure/topic/adminTopicRepository';

const topicRepository = new AdminTopicRepository();

export async function GET(
    req: NextRequest,
    { params }: { params: { topicId: string } }
) {
    const topic = await topicRepository.find(params.topicId);

    if (topic === undefined) {
        return NextResponse.json(
            { error: 'Topic not found.' },
            { status: 404 }
        );
    }

    return NextResponse.json({ topic }, { status: 200 });
}
