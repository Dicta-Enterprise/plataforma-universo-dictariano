import { Component } from '@angular/core';
import { SppinerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-spinner-ellipsis',
  templateUrl: './spinner-ellipsis.component.html',
  styleUrls: ['./spinner-ellipsis.component.css'],
})
export class SpinnerEllipsisComponent {
  isLoading$ = this.spinnerService.isLoading;
  constructor(private readonly spinnerService: SppinerService) {}
}
