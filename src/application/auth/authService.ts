import {
    IAuthRepository,
    UserRecord,
} from '@/infrastructure/auth/iAuthRepository';
import { isAcceptable, Policy } from '@/domain/policy';
import { Role } from '@/domain/role';
import { RoleService } from '@/application/role/roleService';

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
        idToken: string,
        requiredPolicy: Policy
    ): Promise<AuthorizeResult> {
        const decodedIdToken = await this.authRepository.verifyIdToken(idToken);
        const user = await this.authRepository.getUser(decodedIdToken.uid);
        const role = await this.roleService.getRole(user.customClaims?.role);

        if (role === undefined)
            return {
                user,
                role: undefined,
                accepted: false,
            };

        return {
            user,
            role,
            accepted: isAcceptable(role.policies, requiredPolicy),
        };
    }
}
