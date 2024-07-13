import { ReactNode } from 'react';

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
}

export const AccountCircleIcon = (props: MaterialSymbolProp) => {
    return <MaterialSymbol {...props}>account_circle</MaterialSymbol>;
}
