interface Props {
    url: string;
    title: string;
    description?: string;
    banner?: string;
    themeColor?: string;
}

export default function EmbedCard({url, title, description = "", banner, themeColor = 'transparent'}: Props) {
    return (
        <div className={"h-28 overflow-y-hidden flex " +
            "border border-stone-400 hover:bg-stone-100 rounded-lg"}>
            <div style={{backgroundColor: themeColor}} className={"h-full w-1 min-w-1"}/>
            <a href={url} className={"flex"}
               target={"_blank"} rel={"noreferrer noopener"}>
                <div className={"px-4 py-2"}>
                    <p className={"font-bold line-clamp-1"}>{title}</p>
                    <p className={"text-sm line-clamp-2 text-ellipsis"}>{description}</p>
                </div>
                {banner &&
                    <img src={banner} alt={"banner"} className={"aspect-video"}/>
                }
            </a>
        </div>
    )
}
