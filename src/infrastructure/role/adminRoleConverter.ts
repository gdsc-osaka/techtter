import { firestore } from 'firebase-admin';
import { assertsRole, Role } from '@/domain/role';

export const adminRoleConverter: firestore.FirestoreDataConverter<Role> = {
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): Role {
        const data = snapshot.data();
        const topic = { ...data, id: snapshot.id };
        assertsRole(topic);
        return topic;
    },
    toFirestore(
        modelObject:
            | FirebaseFirestore.WithFieldValue<Role>
            | FirebaseFirestore.PartialWithFieldValue<Role>
    ) {
        const d = Object.assign({}, modelObject);
        delete d.id;
        return d;
    },
};
