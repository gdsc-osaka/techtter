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
    return <MaterialSymbol {...props}>account_circle</MaterialSymbol>;
};

export const AddIcon = (props: MaterialSymbolProp) => {
    return <MaterialSymbol {...props}>add</MaterialSymbol>;
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
