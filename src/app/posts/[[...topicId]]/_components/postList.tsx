'use client';

import PostItem from '@/app/posts/[[...topicId]]/_components/postItem';
import {
    subscribePostsFamily,
    postsFamily,
} from '@/app/posts/[[...topicId]]/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

interface Props {
    topicId: string;
    topicLeft: number;
    topicRight: number;
}

export default function PostList({ topicLeft, topicRight, topicId }: Props) {
    const posts = useAtomValue(postsFamily(topicId));
    const subscribe = useSetAtom(subscribePostsFamily(topicId));

    useEffect(() => {
        subscribe({ left: topicLeft, right: topicRight });
    }, [topicRight, topicLeft]);

    return (
        <ol className={'h-full align-bottom'}>
            {posts.map((post) => (
                <PostItem post={post} key={post.id} />
            ))}
        </ol>
    );
}
