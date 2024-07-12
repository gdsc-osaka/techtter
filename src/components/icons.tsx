import { ReactNode } from 'react';

type MaterialSymbolProp = {
    className?: string;
    size?: 20 | 24 | 48;
};

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
