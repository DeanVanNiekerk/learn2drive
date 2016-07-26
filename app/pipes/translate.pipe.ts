import {Pipe, PipeTransform} from '@angular/core';
import {ResourceService} from '../services/resource.service';

@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {

    private index = [];

    constructor(private resourceService: ResourceService) {
         this.resourceService
            .getResourceIndex()
            .then(index => {
                this.index = index;
            })
    }

    transform(value: string): string {
        return this.index[value];
    }
}