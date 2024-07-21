import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    open: boolean;
    onClose: () => void;
}

export default function Modal({ children, open, onClose }: Props) {
    const handleClick = () => {
        onClose();
    };

    if (!open) {
        return null;
    }

    return (
        <>
            <div
                className={'absolute inset-0 bg-black opacity-20 z-10'}
                onClick={handleClick}
            ></div>
            <div
                className={
                    'absolute inset-0 m-auto align-center w-fit h-fit px-10 py-8 rounded-md bg-stone-100 z-20 ' +
                    'flex justify-center'
                }
            >
                {children}
            </div>
        </>
    );
}
