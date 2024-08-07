import { headers } from 'next/headers';

export function getHost(): string | null {
    const heads = headers();
    const protocol = heads.get('x-forwarded-proto');
    const host = heads.get('host');

    if (host === null || protocol === null) return null;

    return `${protocol}://${host}`;
}

/**
 * server から呼ぶ fetch 関数. ホストを input に結合して fetch する
 * @param input
 * @param init
 */
export function sfetch(
    input: string | URL | globalThis.Request,
    init?: RequestInit
): Promise<Response> {
    const host = getHost();
    if (host === null) return Promise.reject(new Error('Host not found.'));
    return fetch(host + input, init);
}
