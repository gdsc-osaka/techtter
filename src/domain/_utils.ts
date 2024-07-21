import { FieldValue, Timestamp } from 'firebase/firestore';

export type ForCreate<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;
export type ForCreateWithId<T> = Omit<T, 'created_at' | 'updated_at'>;
export type ForUpdate<T extends { id: unknown }> = Pick<T, 'id'> &
    Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>;

type Primitive = string | number | boolean | null | undefined;
type FieldValuable = Timestamp;
export type WithFieldValues<T> = T extends Primitive
    ? T
    : T extends FieldValuable
      ? T | FieldValue
      : {
            [K in keyof T]: WithFieldValues<T[K]>;
        };
