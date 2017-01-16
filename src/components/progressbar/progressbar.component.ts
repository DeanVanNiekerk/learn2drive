import {Component, OnInit, Input} from '@angular/core';


@Component({
    selector: 'progressbar',
    templateUrl: './progressbar.component.html'
})
export class ProgressBarComponent implements OnInit {

    @Input() key: string;

    @Input() colorFrom: string;
    @Input() colorTo: string;
    @Input() outOf: number;

    private progressBar: any = null;

    constructor() { 
    }

    ngOnInit() {

    }

     update(percent: number) {

        this.initialize();
      
        this.progressBar.animate(percent / 100);
     }

     private initialize() {

        if (this.progressBar != null)
            return;

        let outOf = this.outOf;

        this.progressBar = new ProgressBar.Circle('#' + this.key, {
            color: this.colorFrom,
            trailColor: '#eee',
            strokeWidth: 6,
            duration: 1400,
            easing: 'easeInOut',
            from: {color: this.colorFrom},
            to: {color: this.colorTo},
            // Set default step function for all animate calls
            step: function(state, circle) {
                
                circle.path.setAttribute('stroke', state.color);

                let value = Math.round(circle.value() * 100);
                let displayText = '';

                if (outOf) {
                    // let x = 1 / outOf * 100;
                    let done = Math.round(value / (1 / outOf * 100));
                    displayText = done + '/' + outOf;
                } else {
                    displayText = value + '%';
                }
               
                circle.setText(displayText);

                circle.text.style.color = state.color;
            }
        });

        this.progressBar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        this.progressBar.text.style.fontSize = '1.2rem';
     }

}