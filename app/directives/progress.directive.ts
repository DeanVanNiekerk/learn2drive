import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({ 
    selector: '[progress]' 
})

export class ProgressDirective {
    constructor(el: ElementRef, renderer: Renderer) {

       //renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');

       let progressBar = new ProgressBar.Circle(el.nativeElement, {
                                color: '#555',
                                trailColor: '#eee',
                                strokeWidth: 10,
                                duration: 2500,
                                easing: 'easeInOut'
                            });

        progressBar.animate(0.0, {
               
            }, function() {
                progressBar.animate(0.9);
            });
    }
}