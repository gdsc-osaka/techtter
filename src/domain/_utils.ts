export type ForCreate<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type ForUpdate<T extends { id: unknown }> = Pick<T, 'id'> &
    Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;
