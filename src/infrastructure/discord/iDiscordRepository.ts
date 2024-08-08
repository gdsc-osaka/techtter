import { DiscordRequest } from "@/domain/discord";

export interface IDiscordRepository {
    send(url: string, request: DiscordRequest): Promise<void>;
}
