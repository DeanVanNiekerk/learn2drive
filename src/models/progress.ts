

export class Progress {
    
    total: number;
    complete: number;
    
    constructor(total: number, complete: number) {
        this.total = total;
        this.complete = complete;
    }

    percent(): number {
        return (this.complete / this.total) * 100;
    }

    isComplete(): boolean {
        return this.complete >= this.total;
    }
}