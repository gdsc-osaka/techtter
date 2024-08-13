import EmbedCard from '@/app/embed/_components/embedCard';
import fetchMeta from '@/fetcbers/fetchMeta';

export default async function Page({
    searchParams,
}: {
    searchParams: { url: string };
}) {
    const { metadata } = await fetchMeta(searchParams.url);

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
