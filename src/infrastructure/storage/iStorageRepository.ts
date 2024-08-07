export interface IStorageRepository {
    upload(path: string, buf: Buffer): Promise<void>;
    delete(path: string): Promise<void>;
}
