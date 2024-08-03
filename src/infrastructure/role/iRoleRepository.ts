import { Role } from '@/domain/role';
import { ForCreateWithId, ForUpdate } from '@/domain/_utils';

export interface IRoleRepository {
    create(role: ForCreateWithId<Role>): Promise<Role>;
    update(role: ForUpdate<Role>): Promise<void>;
    delete(id: string): Promise<void>;
    find(id: string): Promise<Role | undefined>;
}
