import {
    LoaderCircleIcon,
    UserIcon,
    PencilIcon as L_PencilIcon,
    Trash2Icon,
} from 'lucide-react';
import { ReactNode } from 'react';
import Image from 'next/image';

interface MaterialSymbolProp {
    className?: string;
    size?: number;
}

const MaterialSymbol = ({
    className = '',
    size = 24,
    children,
}: MaterialSymbolProp & {
    children: ReactNode;
}) => {
    return (
        <span
            className={`material-symbols-outlined ${className}`}
            style={{ fontSize: `${size}px` }}
        >
            {children}
        </span>
    );
};

export const KeyboardArrowDownIcon = (props: MaterialSymbolProp) => {
    return <MaterialSymbol {...props}>keyboard_arrow_down</MaterialSymbol>;
};

export const SendIcon = (props: MaterialSymbolProp) => {
    return <MaterialSymbol {...props}>send</MaterialSymbol>;
};

export const AccountCircleIcon = (props: MaterialSymbolProp) => {
    return <UserIcon {...props} />;
};

export const AddIcon = (props: MaterialSymbolProp) => {
    return <MaterialSymbol {...props}>add</MaterialSymbol>;
};

export const ProgressActivityIcon = (props: MaterialSymbolProp) => {
    return <LoaderCircleIcon {...props} />;
};

export const MenuIcon = (props: MaterialSymbolProp) => {
    return <MaterialSymbol {...props}>menu</MaterialSymbol>;
};

export const MoreHorizIcon = (props: MaterialSymbolProp) => {
    return <MaterialSymbol {...props}>more_horiz</MaterialSymbol>;
};

export const DeleteIcon = (props: MaterialSymbolProp) => {
    return <Trash2Icon {...props} />;
};

export const UploadFileIcon = (props: MaterialSymbolProp) => {
    return <MaterialSymbol {...props}>upload_file</MaterialSymbol>;
};

export const SentimentStressedIcon = (props: MaterialSymbolProp) => {
    return <MaterialSymbol {...props}>sentiment_stressed</MaterialSymbol>;
};

export const PencilIcon = (props: MaterialSymbolProp) => {
    return <L_PencilIcon {...props} size={props.size} />;
};

export const GoogleIcon = ({ size = 24 }: MaterialSymbolProp) => {
    return (
        <Image
            src={'/google.svg'}
            alt={'google Logo'}
            width={size}
            height={size}
        />
    );
};
