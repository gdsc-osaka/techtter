import EmbedCard from '@/app/embed/_components/embedCard';
import { getHost } from '@/lib/urlUtils';

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
    const host = getHost();
    if (host === null) return Promise.reject();

    const res = await fetch(`${host}/api/meta?url=${searchParams.url}`, {
        method: 'GET',
        // cache for one day
        next: { revalidate: 86400 },
    });
    const { metadata } = (await res.json()) as Meta;

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
