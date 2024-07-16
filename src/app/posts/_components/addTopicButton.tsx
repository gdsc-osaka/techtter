import {AddIcon} from "@/components/icons";

interface Props {
    onClick: () => void;
    size?: number
}

export default function AddTopicButton({onClick, size = 16}: Props) {
    return (
        <button className={'flex'} onClick={onClick} style={{width: `${size}px`, height: `${size}px`}}>
            <AddIcon
                size={size}
                className={'text-stone-500 hover:text-stone-900'}
            />
        </button>
    );
}
