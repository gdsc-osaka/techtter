import { RoleService } from '@/application/role/roleService';
import { isPolicyAllowed, Policy } from '@/domain/policy';
import { Role } from '@/domain/role';
import {
    IAuthRepository,
    UserRecord,
} from '@/infrastructure/auth/iAuthRepository';
import { cookies } from 'next/headers';

interface AuthorizeResult {
    user: UserRecord;
    role?: Role;
    accepted: boolean;
}

export class AuthService {
    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly roleService: RoleService
    ) {}

    async authorize(
        requiredPolicy: Policy,
        user?: UserRecord
    ): Promise<AuthorizeResult> {
        const _user = user ?? (await this.getUser());
        const role = await this.roleService.getRole(_user.customClaims?.role);

        if (role === undefined)
            return {
                user: _user,
                role: undefined,
                accepted: false,
            };

        return {
            user: _user,
            role,
            accepted: isPolicyAllowed(role.policies, requiredPolicy),
        };
    }

    private async getUser() {
        const idToken = cookies().get('idToken')?.value;

        if (idToken === undefined) {
            return Promise.reject(new Error('Unauthorized'));
        }

        const decodedIdToken = await this.authRepository.verifyIdToken(idToken);
        return await this.authRepository.getUser(decodedIdToken.uid);
    }
}
