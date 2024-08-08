import PostDeleteDialog from '@/app/posts/[...topicId]/_components/postDeleteDialog';
import { roleAtom } from '@/atoms/roleAtom';
import { userAtom } from '@/atoms/userAtom';
import { DeleteIcon, PencilIcon } from '@/components/icons';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { isPolicyAllowed, Policy } from '@/domain/policy';
import { Post } from '@/domain/post';
import { useAtomValue } from 'jotai';
import { ReactNode, useState } from 'react';

interface Props {
    trigger: ReactNode;
    post: Post;
    onEdit: () => void;
}

export default function PostDropDownMenu({ trigger, post, onEdit }: Props) {
    const [openDialog, setOpenDialog] = useState(false);
    const user = useAtomValue(userAtom);
    const role = useAtomValue(roleAtom);

    if (user === null || role.state !== 'hasData' || role.data === null)
        return null;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    {post.user_id === user.uid &&
                        isPolicyAllowed(
                            role.data.policies,
                            Policy.POST_UPDATE_SELF
                        ) && (
                            <DropdownMenuItem className={''} onClick={onEdit}>
                                <PencilIcon size={20} className={'mr-2'} />
                                投稿を編集
                            </DropdownMenuItem>
                        )}
                    {isPolicyAllowed(
                        role.data.policies,
                        post.user_id === user.uid
                            ? Policy.POST_DELETE_SELF
                            : Policy.POST_DELETE
                    ) && (
                        <DropdownMenuItem
                            className={'text-red-600 focus:text-destructive'}
                            onClick={() => setOpenDialog((prev) => !prev)}
                        >
                            <DeleteIcon size={20} className={'mr-2'} />
                            投稿を削除
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            <PostDeleteDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                post={post}
            />
        </>
    );
}
