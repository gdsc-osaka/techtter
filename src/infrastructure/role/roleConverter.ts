import { assertsRole, Role } from '@/domain/role';
import { FirestoreDataConverter } from 'firebase/firestore';

export const roleConverter: FirestoreDataConverter<Role> = {
    fromFirestore(snapshot, options): Role {
        const data = snapshot.data(options);
        const role = { ...data, id: snapshot.id };
        assertsRole(role);
        return role;
    },
    toFirestore(modelObject) {
        const d = Object.assign({}, modelObject);
        delete d.id;
        return d;
    },
};
