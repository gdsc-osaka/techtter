import { FireUser, fireUserSchema } from '@/domain/fireUser';
import useSWR from 'swr';

interface Result {
    data: FireUser | undefined;
    error: Error | undefined;
    isLoading: boolean;
}

export default function useFetchUser(userId: string): Result {
    return useSWR<FireUser, Error>(userId, async (id: string) => {
        const res = await fetch(`/api/users/${id}`, {
            cache: 'force-cache',
        }).then((res) => res.json());
        const parsed = fireUserSchema.safeParse(res.user);

        if (!parsed.success) {
            return Promise.reject(new Error('User type is invalid.'));
        }

        return parsed.data;
    });
}
