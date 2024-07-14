'use client';

import PostItem from '@/app/posts/[[...topicId]]/_components/postItem';
import {
    subscribePostsFamily,
    postsFamily,
} from '@/app/posts/[[...topicId]]/atoms';
import {useAtomValue, useSetAtom} from 'jotai';
import {MutableRefObject, useEffect, useRef} from 'react';

interface Props {
    topicId: string;
    topicLeft: number;
    topicRight: number;
}

export default function PostList({topicLeft, topicRight, topicId}: Props) {
    const posts = useAtomValue(postsFamily(topicId));
    const subscribe = useSetAtom(subscribePostsFamily(topicId));

    useEffect(() => {
        subscribe({left: topicLeft, right: topicRight});
    }, [topicRight, topicLeft]);

    useEffect(() => {
        if (posts.length === 0) return;
        const lastPost = posts[posts.length - 1];
        document.getElementById(`post-item-${lastPost.id}`)?.scrollIntoView({behavior: "smooth", block: "nearest"});
    }, [posts]);

    return (
        <div
            className={
                'absolute inset-0 bottom-0 overflow-y-scroll scroll'
            }
        >
            <ol className={'h-full align-bottom'}>
                {posts.map((post) => (
                    <PostItem post={post} key={post.id}/>
                ))}
            </ol>
        </div>
    );
}
