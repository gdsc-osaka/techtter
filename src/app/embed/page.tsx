import EmbedCard from '@/app/embed/_components/embedCard';
import metaFetcher from "meta-fetcher";

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

export default async function Page({
    searchParams,
}: {
    searchParams: { url: string };
}) {
    const {metadata} = await metaFetcher(searchParams.url);

    return (
        <EmbedCard
            url={metadata.website}
            title={metadata.title}
            description={metadata.description}
            banner={metadata.banner}
            themeColor={metadata.themeColor}
        />
    );
}
