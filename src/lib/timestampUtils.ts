import { firestore } from "firebase-admin";
import { Timestamp } from 'firebase/firestore';

function isTimestamp(obj: unknown): obj is Timestamp {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'seconds' in obj &&
        'nanoseconds' in obj &&
        typeof obj.seconds === 'number' &&
        typeof obj.nanoseconds === 'number' &&
        Object.keys(obj).length === 2
    );
}

// type Timestamped<T extends {}> = {
//     [K in keyof T]: T[K] extends {} ? ('seconds' & keyof T[K]) extends string ? Timestamp : T[K] : T[K]
// }

export function convertTimestampInObject<T extends {}>(obj: T) {
    const entries = Object.entries(obj);
    return Object.fromEntries(entries.map(([k, v]) => {
        if (!isTimestamp(v)) {
            return [k, v];
        }

        return [k, new Timestamp(v.seconds, v.nanoseconds)];
    }));
}
