import { AddIcon } from '@/components/icons';
import { roleAtom } from '@/atoms/roleAtom';
import { isPolicyAllowed, Policy } from '@/domain/policy';
import { useAtomValue } from 'jotai';

interface Props {
    onClick: () => void;
    size?: number;
}

export default function AddTopicButton({ onClick, size = 16 }: Props) {
    const role = useAtomValue(roleAtom);

    if (
        role.state === 'hasData' &&
        isPolicyAllowed(role.data?.policies ?? [], Policy.TOPIC_CREATE)
    ) {
        return (
            <button
                className={'flex'}
                onClick={onClick}
                style={{ width: `${size}px`, height: `${size}px` }}
            >
                <AddIcon
                    size={size}
                    className={'text-stone-500 hover:text-stone-900'}
                />
            </button>
        );
    }

    return null;
}
