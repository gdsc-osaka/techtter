import { Role } from '@/domain/role';
import { atom } from 'jotai';
import { userAtom } from '@/atoms/userAtom';
import { RoleRepository } from '@/infrastructure/role/roleRepository';
import { RoleService } from '@/application/role/roleService';
import { loadable } from 'jotai/utils';

const roleService = new RoleService(new RoleRepository());

export const roleAtom = loadable(
    atom<Promise<Role | null>>(async (get) => {
        const user = get(userAtom);
        if (user === null) return null;

        const idToken = await user.getIdTokenResult(true);
        const roleId = idToken.claims?.role;

        if (roleId !== undefined && typeof roleId !== 'string')
            return null;

        const role = await roleService.getRole(roleId);
        return role ?? null;
    })
);
