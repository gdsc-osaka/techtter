import {IRoleRepository} from "@/infrastructure/role/iRoleRepository";
import {Role} from "@/domain/role";
import {Admin} from "@/firebaseAdmin";
import {adminRoleConverter} from "@/infrastructure/role/adminRoleConverter";
import {firestore} from "firebase-admin";
import {ForCreateWithId, ForUpdate} from "@/domain/_utils";
import {logger} from "@/logger";
import {Timestamp} from "firebase/firestore";

export class AdminRoleRepository implements IRoleRepository {
    private readonly docRef = (id: string) => Admin.db.doc(`roles/${id}`).withConverter(adminRoleConverter);

    async create(role: ForCreateWithId<Role>): Promise<Role> {
        try {
            await this.docRef(role.id)
                .set({
                    ...role,
                    created_at: firestore.FieldValue.serverTimestamp(),
                    updated_at: firestore.FieldValue.serverTimestamp(),
                });
            logger.log(`Role created. (${role.id})`);
            return {
                ...role,
                created_at: Timestamp.now(),
                updated_at: Timestamp.now(),
            };
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.docRef(id).delete();
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async find(id: string): Promise<Role | undefined> {
        try {
            const snapshot = await this.docRef(id).get();
            return snapshot.data();
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async update(role: ForUpdate<Role>): Promise<void> {
        try {
            await this.docRef(role.id).update({
                ...role,
                updated_at: firestore.FieldValue.serverTimestamp(),
            });
            logger.log(`Role updated. (${role.id})`);
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

}
