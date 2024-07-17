import {headers} from "next/headers";

export function getHost(): string | null {
    const heads = headers();
    const protocol = heads.get("x-forwarded-proto");
    const host = heads.get("host");

    if (host === null || protocol === null) return null;

    return `${protocol}://${host}`;
}
