import FileList from '@/app/posts/[...topicId]/_components/fileList';
import Markdown from '@/app/posts/[...topicId]/_components/markdown';
import PostDropDownMenu from '@/app/posts/[...topicId]/_components/postDropDownMenu';
import PostEdit from '@/app/posts/[...topicId]/_components/postEdit';
import Embed from '@/components/embed';
import { MoreHorizIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Post } from '@/domain/post';
import useFetchFileUrl from '@/fetcbers/useFetchFileUrl';
import useFetchUser from '@/fetcbers/useFetchUser';
import { extractUrls } from '@/lib/strlib';
import { useMemo, useState } from 'react';

interface Props {
    post: Post;
    hideMenu?: boolean;
    size?: 'small' | 'default';
}

export default function PostItem({
    post,
    hideMenu = false,
    size = 'default',
}: Props) {
    const date = post.created_at.toDate();
    const user = useFetchUser(post.user_id);
    const urls = useMemo(() => extractUrls(post.content), [post.content]);
    const fileUrls = post.files.map((file) => useFetchFileUrl(file));
    const [editing, setEditing] = useState(false);

    return (
        <li
            id={`post-item-${post.id}`}
            className={
                'px-3 py-3 rounded flex items-start gap-4 transition-colors'
            }
        >
            {/* user データありかつ photoUrl あり*/}
            {!user.isLoading && user?.data?.photoUrl && (
                <img
                    src={user.data.photoUrl}
                    alt={'User Icon'}
                    className={'rounded-full w-9 h-9'}
                />
            )}
            {/* user 読み込み中 */}
            {user.isLoading && <Skeleton className={'rounded-full w-9 h-9'} />}
            <div className={'w-full flex flex-col gap-1'}>
                <div className={'flex items-start gap-1'}>
                    <div className={'w-full flex flex-col gap-1'}>
                        <h3 className={'flex items-center gap-3'}>
                            {/* displayName あり */}
                            {!user.isLoading && (
                                <span className={'text-xs'}>
                                    {user?.data?.displayName
                                        ? user.data.displayName
                                        : 'Unknown'}
                                </span>
                            )}
                            {/*読み込み中*/}
                            {user.isLoading && (
                                <Skeleton className={'w-20 h-4'} />
                            )}
                            <span
                                className={'text-xs text-stone-600 '}
                            >{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</span>
                        </h3>
                        {!editing && <Markdown>{post.content}</Markdown>}
                        {editing && (
                            <PostEdit
                                post={post}
                                onClose={() => setEditing(false)}
                            />
                        )}
                        {size === 'default' && <FileList fileUrls={fileUrls} />}
                    </div>
                    {hideMenu || (
                        <PostDropDownMenu
                            post={post}
                            trigger={
                                <Button variant={'ghost'} size={'icon'}>
                                    <MoreHorizIcon size={20} />
                                </Button>
                            }
                            onEdit={() => setEditing(true)}
                        />
                    )}
                </div>
                {size === 'default' && (
                    <div className={'w-full'}>
                        {urls.map((url) => (
                            <Embed url={url} key={`embed-${url}`} />
                        ))}
                    </div>
                )}
            </div>
        </li>
    );
}
