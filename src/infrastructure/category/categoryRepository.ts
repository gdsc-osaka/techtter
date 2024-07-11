import {ICategoryRepository} from "@/infrastructure/category/iCategoryRepository";
import {ForCreate, ForUpdate} from "@/domain/_utils";
import {Category} from "@/domain/category";
import {db} from "@/firebase";
import {addDoc, collection, deleteDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import {categoryConverter} from "@/infrastructure/category/categoryConverter";
import {logger} from "@/logger";

export class CategoryRepository implements ICategoryRepository {
    private readonly colRef = () => collection(db, `categories`)
        .withConverter(categoryConverter);
    private readonly docRef = (categoryId: string) => doc(db, `categories/${categoryId}`)
        .withConverter(categoryConverter)

    async create(category: ForCreate<Category>): Promise<void> {
        try {
            await addDoc(this.colRef(), category);
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await deleteDoc(this.docRef(id));
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async update(category: ForUpdate<Category>): Promise<void> {
        try {
            await updateDoc(this.docRef(category.id), category);
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

}
