import EmbedCard from "@/app/embed/_components/embedCard";
import {headers} from "next/headers";

export interface Meta {
    metadata: {
        website: string;
        title: string;
        description: string | undefined;
        banner: string | undefined;
        themeColor: string | undefined;
    };
    socials: Record<string, string | undefined>;
    favicons: string[];
}

export default async function Page({searchParams}: { searchParams: { url: string } }) {
    const heads = headers();
    const protocol = heads.get("x-forwarded-proto");
    const host = heads.get("host");

    if (host === null || protocol === null) return Promise.reject();

    const res = await fetch(`${protocol}://${host}/api/meta?url=${searchParams.url}`, {method: "GET"});
    const {metadata}  = (await res.json()) as Meta;

    return (
        <EmbedCard url={metadata.website} title={metadata.title} description={metadata.description}
                   banner={metadata.banner} themeColor={metadata.themeColor}/>
    )
}
