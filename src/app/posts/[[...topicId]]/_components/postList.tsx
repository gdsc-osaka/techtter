'use client';

import PostItem from '@/app/posts/[[...topicId]]/_components/postItem';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { postsFamily } from '@/atoms/postAtom';

interface Props {
    topicId: string;
    topicLeft: number;
    topicRight: number;
}

export default function PostList({ topicId, topicLeft, topicRight }: Props) {
    const [posts, subscribe] = useAtom(postsFamily(topicId));

    useEffect(() => {
        subscribe({ left: topicLeft, right: topicRight });

        // return () => {
        //     console.log(`Unsub: ${unsub === undefined}`)
        //     unsub?.();
        // };
    }, [topicId, posts]);

    useEffect(() => {
        if (posts.length === 0) return;
        const lastPost = posts[posts.length - 1];
        document
            .getElementById(`post-item-${lastPost.id}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [posts]);

    return (
        <div className={'absolute inset-0 bottom-0 overflow-y-scroll scroll'}>
            <ol className={'h-full align-bottom'}>
                {posts.map((post) => (
                    <PostItem post={post} key={post.id} />
                ))}
            </ol>
        </div>
    );
}
