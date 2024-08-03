import { Role } from '@/domain/role';
import { IRoleRepository } from '@/infrastructure/role/iRoleRepository';

export class RoleService {
    constructor(private readonly roleRepository: IRoleRepository) {}

    getRole(roleId?: string): Promise<Role | undefined> {
        return this.roleRepository.find(roleId ?? 'default');
    }
}
