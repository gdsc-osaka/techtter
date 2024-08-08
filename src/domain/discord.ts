export interface DiscordRequest {
    content: string,
    username?: string,
    avatar_url?: string,
    embeds?: Embed[],
}

export interface Embed {
    title?: string,
    description?: string,
    url?: string,
    color?: number,
}
