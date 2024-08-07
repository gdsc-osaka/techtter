import { ProgressActivityIcon } from "@/components/icons";

interface Props {
    size?: number;
    className?: string;
}

export default function CircularProgressIndicator({size = 24, className = ""}: Props) {
    return (
        <ProgressActivityIcon
            className={`mx-auto animate-spin ${className}`} size={size}
        />
    );
}
