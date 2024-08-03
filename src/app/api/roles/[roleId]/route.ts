import { AdminRoleRepository } from '@/infrastructure/role/adminRoleRepository';
import { NextRequest, NextResponse } from 'next/server';

const roleRepository = new AdminRoleRepository();

export async function GET(
    req: NextRequest,
    { params }: { params: { roleId: string } }
) {
    const { roleId } = params;

    const role = await roleRepository.find(roleId);

    if (role === undefined) {
        return NextResponse.json({ error: 'Role not found.' }, { status: 404 });
    }

    return NextResponse.json({ role }, { status: 200 });
}
