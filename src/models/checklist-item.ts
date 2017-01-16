export class ChecklistItem {
    
    id: number;
    key: string;
    complete: boolean;
    
    constructor(id: number, key: string, complete: boolean) {
        this.id = id;
        this.key = key;
        this.complete = complete;
    }
    
}