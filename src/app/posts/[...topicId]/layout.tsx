import { Props } from '@/app/posts/[...topicId]/page';
import { Topic } from "@/domain/topic";
import { Metadata } from 'next';
import { Noto_Sans_JP } from "next/font/google";
import { ReactNode } from 'react';

import './globals.css';

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Techtter β',
        template: '%s | Techtter β',
    },
    description: '知見をシェアするプラットフォーム',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
        <head>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
        </head>
        <body className={`${notoSansJP.className} scroll`}>{children}</body>
        </html>
    );
}


async function findTopic(id: string): Promise<Topic | undefined> {
    return {
        gen: 0,
        icon_path: null,
        id: id,
        left: 0,
        name: 'Test',
        right: 0,
    } as Topic;
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     const topicId = params.topicId[params.topicId.length - 1];
//     // const topicRepository = new AdminTopicRepository();
//     const topic = await findTopic(topicId);
//     if (topic === undefined) return { title: 'Topic not found.' };
//
//     return {
//         title: topic.name,
//     };
// }
