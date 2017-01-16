export class Message {
    
    id: number;
    key: string;
    shown: boolean;
    showAgain: boolean;
    
    constructor(id: number, key: string, shown: boolean, showAgain: boolean) {
        this.id = id;
        this.key = key;
        this.shown = shown;
        this.showAgain = showAgain;
    }
    
}