'use client';

import PostItem from '@/app/posts/[...topicId]/_components/postItem';
import { existsMorePostsFamily, fetchOlderPostsFamily, postsFamily, } from '@/atoms/postAtom';
import CircularProgressIndicator from '@/components/circularProgressIndicator';
import Divider from '@/components/divider';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';

interface Props {
    topicId: string;
    topicLeft: number;
    topicRight: number;
}

function scrollAt(postId: string) {
    document
        .getElementById(`post-item-${postId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

export default function PostList({ topicId, topicLeft, topicRight }: Props) {
    const [posts, subscribe] = useAtom(postsFamily(topicId));
    const fetchMore = useSetAtom(fetchOlderPostsFamily(topicId));
    const existsMore = useAtomValue(existsMorePostsFamily(topicId));
    const spinnerRef = useRef<HTMLLIElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [scrolledBottom, setScrolledBottom] = useState(true);

    const topic = {left: topicLeft, right: topicRight};

    // subscribe latest posts
    useEffect(() => {
        subscribe(topic);
    }, [topicId, posts]);

    // scroll at proper posts
    useEffect(() => {
        if (posts.length === 0) return;

        if (scrolledBottom) {
            scrollAt(posts[posts.length - 1].id);
            setScrolledBottom(true);
        }
    }, [posts]);

    // watch scroll to top
    useEffect(() => {
        const spinner = spinnerRef.current;

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting || !existsMore) return;
            fetchMore(topic);
        });

        if (spinner) observer.observe(spinner);

        return () => {
            if (spinner) observer.unobserve(spinner);
        };
    }, [spinnerRef.current, existsMore, fetchMore, topicId]);

    // watch scrolled to bottom
    useEffect(() => {
        const list = listRef.current;
        if (list === null) return;

        function handleScroll() {
            if (list === null) return;
            setScrolledBottom(
                list.scrollHeight - list.clientHeight - list.scrollTop < 1
            );
        }

        list.addEventListener('scroll', handleScroll);

        return () => {
            list.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            ref={listRef}
            className={'absolute inset-0 bottom-0 overflow-y-scroll scroll'}
        >
            <ol className={'h-full align-bottom'}>
                {existsMore && (
                    <li ref={spinnerRef} className={'w-full text-center'}>
                        <CircularProgressIndicator />
                    </li>
                )}
                {!existsMore && (
                    <li className={'mb-4 mt-4'}>
                        <Divider />
                    </li>
                )}
                {posts.map((post) => (
                    <PostItem post={post} key={post.id} />
                ))}
            </ol>
        </div>
    );
}
