import { storage } from '@/firebaseAdmin';
import { IStorageRepository } from '@/infrastructure/storage/iStorageRepository';
import { logger } from '@/logger';

export class AdminStorageRepository implements IStorageRepository {
    async upload(path: string, buf: Buffer) {
        try {
            await storage.file(path).save(buf);
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async delete(path: string) {
        try {
            await storage.file(path).delete();
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
}
