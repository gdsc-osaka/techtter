import { AdminTopicRepository } from '@/infrastructure/topic/adminTopicRepository';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const topicRepository = new AdminTopicRepository();
        const topics = await topicRepository.findMany();
        return NextResponse.json({ topics: topics }, { status: 200 });
    } catch (e) {
        return NextResponse.json(
            {
                topic: [],
                message:
                    e instanceof Error ? e.message : 'Internal server error',
            },
            { status: 500 }
        );
    }
}
