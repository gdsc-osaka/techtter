import {FirestoreDataConverter, Timestamp} from "firebase/firestore";
import {Category} from "@/domain/category";

function assertsCategory(data: any): asserts data is Category {
    if (
        typeof data.id === 'string' &&
        typeof data.name === 'string' &&
        typeof data.left === 'number' &&
        typeof data.right === 'number' &&
        typeof data.created_at === 'object' &&
        data.created_at instanceof Timestamp &&
        typeof data.updated_at === 'object' &&
        data.updated_at instanceof Timestamp
    ) {
        return data;
    }
}

export const categoryConverter: FirestoreDataConverter<Category> = {
    fromFirestore(snapshot, options): Category {
        const data = snapshot.data(options);
        const category = {...data, id: snapshot.id};
        assertsCategory(category);
        return category;
    },
    toFirestore(modelObject) {
        const d = Object.assign({}, modelObject);
        delete d.id;
        return d;
    }
}
