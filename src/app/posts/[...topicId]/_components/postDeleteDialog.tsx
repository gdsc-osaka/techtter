import PostItem from '@/app/posts/[...topicId]/_components/postItem';
import { deletePostAtom } from '@/atoms/postAtom';
import CircularProgressIndicator from '@/components/circularProgressIndicator';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import { Post } from '@/domain/post';
import { useSetAtom } from 'jotai';
import { useState } from 'react';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    post: Post;
}

export default function PostDeleteDialog({ open, onOpenChange, post }: Props) {
    const [deleting, setDeleting] = useState(false);
    const deletePost = useSetAtom(deletePostAtom);

    const handleDelete = async () => {
        setDeleting(true);
        const res = await fetch(`/api/posts/${post.id}`, {
            method: 'DELETE',
        });
        setDeleting(false);
        if (res.status === 200) {
            deletePost(post.id, post.topic_id);
            onOpenChange(false);
        } else {
            // TODO: エラー処理
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>投稿を削除</DialogTitle>
                <DialogDescription>
                    投稿を削除します。よろしいですか？
                </DialogDescription>
                <div className={'bg-stone-50 drop-shadow rounded w-full'}>
                    <PostItem post={post} hideMenu size={'small'} />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'ghost'}>キャンセル</Button>
                    </DialogClose>
                    <Button
                        variant={'destructive'}
                        disabled={deleting}
                        onClick={handleDelete}
                    >
                        {deleting && (
                            <CircularProgressIndicator
                                size={20}
                                className={'mr-2'}
                            />
                        )}
                        削除
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
