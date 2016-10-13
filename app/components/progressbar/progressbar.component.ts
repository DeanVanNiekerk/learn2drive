import {Component, OnInit, Input} from '@angular/core';


@Component({
    selector: 'progressbar',
    templateUrl: 'build/components/progressbar/progressbar.component.html'
})
export class ProgressBarComponent implements OnInit {

    @Input() key: string;

    private progressBar: any = null;

    constructor() { 
    }

    ngOnInit() {

      

    }

     update(percent: number) {

        // var bar = new ProgressBar.Line('#abc', {easing: 'easeInOut'});
        // bar.animate(1); 

        if (this.progressBar == null) {
                this.progressBar = new ProgressBar.Circle('#' + this.key, {
                                color: '#555',
                                trailColor: '#eee',
                                strokeWidth: 10,
                                duration: 1500,
                                easing: 'easeInOut',
                                // Set default step function for all animate calls
                                step: function(state, circle) {
                                    //circle.path.setAttribute('stroke', state.color);
                                    //circle.path.setAttribute('stroke-width', state.width);

                                    var value = Math.round(circle.value() * 100);
                                    if (value === 0) {
                                    circle.setText('0%');
                                    } else {
                                    circle.setText(value + '%');
                                    }

                                }
                            });

                this.progressBar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
                this.progressBar.text.style.fontSize = '2rem';
        }
      
        this.progressBar.animate(percent / 100);
     }

}