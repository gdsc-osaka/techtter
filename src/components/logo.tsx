import Image from "next/image";

interface Props {
    size?: number;
    className?: string;
}

export default function Logo({size = 24, className}: Props) {
    return (
        <Image width={size} height={size} src={"/icon.svg"} alt={"techtter-logo-icon"} className={className}/>
    )
}
