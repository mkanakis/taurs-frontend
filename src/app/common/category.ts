/**
 * Category Model
 */
export class Category {
    id: string;
    categoryName: string;

    constructor (name: string) 
    {
        this.categoryName = name;
    }
}
