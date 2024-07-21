interface Props {
    className?: string;
}

export default function Divider({className}: Props) {
    return (
        <hr className={`text-border ${className ?? ""}`} />
    );
}
