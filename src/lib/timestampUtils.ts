import { firestore } from 'firebase-admin';
import { Timestamp } from 'firebase/firestore';

interface ClientTimestamp {
    seconds: number;
    nanoseconds: number;
}

interface AdminTimestamp {
    _seconds: number;
    _nanoseconds: number;
}

function isClientTimestamp(obj: unknown): obj is ClientTimestamp {
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

function isAdminTimestamp(obj: unknown): obj is AdminTimestamp {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        '_seconds' in obj &&
        '_nanoseconds' in obj &&
        typeof obj._seconds === 'number' &&
        typeof obj._nanoseconds === 'number' &&
        Object.keys(obj).length === 2
    );
}

export function replaceAdminTimestampWithTimestamp(obj: object) {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => {
            if (isAdminTimestamp(v)) {
                return [k, new Timestamp(v._seconds, v._nanoseconds)];
            }

            return [k, v];
        })
    );
}

export function replaceTimestampWithAdminTimestamp(obj: object) {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => {
            if (isClientTimestamp(v)) {
                return [k, new firestore.Timestamp(v.seconds, v.nanoseconds)];
            }

            return [k, v];
        })
    );
}

export function replacePlainObjWithTimestamp(obj: object) {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => {
            if (typeof v === 'object' && v !== null) {
                if (isClientTimestamp(v)) {
                    return [k, new Timestamp(v.seconds, v.nanoseconds)];
                }
            }

            return [k, v];
        })
    );
}
