import { DiscordRequest } from '@/domain/discord';
import { IDiscordRepository } from '@/infrastructure/discord/iDiscordRepository';
import { logger } from '@/logger';

export class DiscordRepository implements IDiscordRepository {
    async send(url: string, request: DiscordRequest): Promise<void> {
        try {
            logger.log(`Sending webhook to ${url}`);
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
}
