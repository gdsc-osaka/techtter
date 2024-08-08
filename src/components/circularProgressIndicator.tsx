import { LoaderCircle } from 'lucide-react';

interface Props {
    size?: number;
    className?: string;
}

export default function CircularProgressIndicator({
    size = 24,
    className = '',
}: Props) {
    return (
        <LoaderCircle
            className={`mx-auto animate-spin ${className}`}
            size={size}
        />
    );
}
