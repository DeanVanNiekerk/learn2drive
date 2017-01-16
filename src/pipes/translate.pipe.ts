import {Pipe, PipeTransform} from '@angular/core';
import {ResourceService} from '../services/resource.service';

@Pipe({
    name: 'translate',
    pure: false
})
export class TranslatePipe implements PipeTransform {

    private text: string = '';
    private promise: Promise<string>;

    constructor(private resourceService: ResourceService) {
    }

    transform(key: string): string {
        if (!this.promise) {
            this.promise = this.resourceService.getResource(key);
            this.promise.then((text: string) => this.text = text);
        }
        return this.text;
    }
}