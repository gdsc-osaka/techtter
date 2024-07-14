import Link from 'next/link';
import { AccountCircleIcon } from '@/components/icons';
import { Post } from '@/domain/post';
import { useAtom } from 'jotai';
import { usersFamily } from '@/app/posts/[[...topicId]]/atoms';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
    post: Post;
}

export default function PostItem({ post }: Props) {
    const date = post.created_at.toDate();
    const [user] = useAtom(usersFamily(post.user_id));

    return (
        <li>
            <Link
                href={''}
                className={
                    'px-3 py-3 rounded flex items-start gap-4 transition-colors ' +
                    'hover:bg-stone-100'
                }
            >
                {/* user データと photoUrl あり*/}
                {user.state === 'hasData' && user?.data?.photoUrl && (
                    <img
                        src={user.data.photoUrl}
                        alt={'User Icon'}
                        className={'rounded-full w-9 h-9'}
                    />
                )}
                {/* user データまたは photoUrl なし*/}
                {user.state === 'hasData' && !user?.data?.photoUrl && (
                    <AccountCircleIcon className={'w-9 h-9'} />
                )}
                {/*読み込み中*/}
                {user.state === 'loading' && (
                    <Skeleton className={'rounded-full w-9 h-9'} />
                )}
                <div className={'flex flex-col gap-1'}>
                    <h3 className={'flex items-center gap-3'}>
                        {/*読み込み終わり*/}
                        {user.state === 'hasData' &&
                            user?.data?.displayName && (
                                <span className={'text-sm'}>
                                    {user.data.displayName}
                                </span>
                            )}
                        {/*読み込み中*/}
                        {user.state === 'loading' && (
                            <Skeleton className={'w-20 h-4'} />
                        )}
                        <span
                            className={'text-xs text-stone-600 '}
                        >{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</span>
                    </h3>
                    <p className={'whitespace-pre-wrap '}>{post.content}</p>
                </div>
            </Link>
        </li>
    );
}
