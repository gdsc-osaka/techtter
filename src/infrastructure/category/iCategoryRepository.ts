import {ForCreate, ForUpdate} from "@/domain/_utils";
import {Category} from "@/domain/category";

export interface ICategoryRepository {
    create(category: ForCreate<Category>): Promise<void>;
    update(category: ForUpdate<Category>): Promise<void>;
    delete(id: string): Promise<void>;
}
