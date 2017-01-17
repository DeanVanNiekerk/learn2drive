export class ChecklistItem {
    
    key: string;
    complete: boolean;
    
    constructor(key: string, complete: boolean) {
        this.key = key;
        this.complete = complete;
    }
    
}