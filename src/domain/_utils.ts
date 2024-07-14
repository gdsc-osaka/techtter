export type ForCreate<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;
export type ForCreateWithId<T> = Omit<T, 'created_at' | 'updated_at'>;
export type ForUpdate<T extends { id: unknown }> = Pick<T, 'id'> &
    Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>;
