import { ComponentProps } from 'react';

interface Props {
    url: string;
}

export default function Embed({
    url,
    className = '',
    ...props
}: Props & Omit<ComponentProps<'iframe'>, 'src'>) {
    return (
        <iframe
            {...props}
            src={`/embed?url=${url}`}
            loading={'lazy'}
            className={`${className} h-28 w-full my-2 overflow-y-hidden`}
        />
    );
}
