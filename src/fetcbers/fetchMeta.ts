import { sfetch } from '@/lib/fetchUtils';

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

export default function fetchMeta(url: string): Promise<Meta> {
    return sfetch(`/api/meta?url=${url}`, { cache: 'force-cache' })
        .then((res) => res.json())
        .then((d) => d.metadata);
}
