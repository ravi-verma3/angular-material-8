import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';
import {SpinnerService} from '../../services/spinner.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SpinnerComponent implements OnInit, AfterViewInit {
  show: Boolean = false;
  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.showSpinner.subscribe(item => {
      this.show = item ? true : false;
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.spinnerService.showSpinner.subscribe(item => {
      this.show = item ? true : false;
    });
  }
}
