import { Admin } from '@/firebaseAdmin';
import { IStorageRepository } from '@/infrastructure/storage/iStorageRepository';
import { logger } from "@/logger";

export class AdminStorageRepository implements IStorageRepository {
    async upload(path: string, buf: Buffer) {
        try {
            await Admin.storage.file(path).save(buf);
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async delete(path: string) {
        try {
            await Admin.storage.file(path).delete();
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
}
