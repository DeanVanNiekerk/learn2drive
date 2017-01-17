export class Message {
    
    key: string;
    shown: boolean;
    showAgain: boolean;
    
    constructor(key: string, shown: boolean, showAgain: boolean) {
        this.key = key;
        this.shown = shown;
        this.showAgain = showAgain;
    }
    
}