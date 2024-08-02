import {IRoleRepository} from "@/infrastructure/role/iRoleRepository";
import {deleteDoc, doc, getDoc, serverTimestamp, setDoc, Timestamp, updateDoc} from "firebase/firestore";
import {db} from "@/firebase";
import {roleConverter} from "@/infrastructure/role/roleConverter";
import {ForCreateWithId, ForUpdate} from "@/domain/_utils";
import {Role} from "@/domain/role";

export class RoleRepository implements IRoleRepository {
    private readonly docRef = (id: string) => doc(db, `roles/${id}`).withConverter(roleConverter);

    async create(role: ForCreateWithId<Role>): Promise<Role> {
        try {
            await setDoc(this.docRef(role.id), {
                ...role,
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
            });
            return {
                ...role,
                id: role.id,
                created_at: Timestamp.now(),
                updated_at: Timestamp.now(),
            };
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await deleteDoc(this.docRef(id));
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    async find(id: string): Promise<Role | undefined> {
        try {
            const snapshot = await getDoc(this.docRef(id));
            return snapshot.data();
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    async update(role: ForUpdate<Role>): Promise<void> {
        try {
            await updateDoc(this.docRef(role.id), {
                ...role,
                updated_at: serverTimestamp(),
            });
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }


}
