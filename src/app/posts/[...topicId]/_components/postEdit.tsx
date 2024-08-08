import { updatePostAtom } from '@/atoms/postAtom';
import { Post } from '@/domain/post';
import { useSetAtom } from 'jotai';
import { useRef } from 'react';

interface Props {
    post: Post;
    onClose: () => void;
}

export default function PostEdit({ post, onClose }: Props) {
    const preRef = useRef<HTMLPreElement>(null);
    const updatePost = useSetAtom(updatePostAtom);

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLPreElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const content = preRef.current?.textContent || '';
            const topicId = new URL(window.location.href).pathname
                .split('/')
                .pop();
            if (topicId !== undefined) {
                updatePost({ id: post.id, content }, topicId);
            } else {
                console.error('Topic ID is not found.');
            }
            onClose();

            await fetch(`/api/posts/${post.id}`, {
                method: 'PUT',
                body: JSON.stringify({ ...post, content }),
            });
        } else if (e.key === 'Escape') {
            e.preventDefault();
            onClose();
        }
    };

    return (
        <div>
            <pre
                contentEditable
                ref={preRef}
                onKeyDown={handleKeyDown}
                className={'rounded p-4 bg-stone-100'}
            >
                {post.content}
            </pre>
            <p className={'text-xs text-stone-700'}>
                Esc でキャンセル, Enter で保存
            </p>
        </div>
    );
}
