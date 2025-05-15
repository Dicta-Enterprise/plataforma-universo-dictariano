import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerJumpComponent } from './spinner-jump/spinner-jump.component';
import { SpinnerEllipsisComponent } from './spinner-ellipsis/spinner-ellipsis.component';



@NgModule({
  declarations: [
    SpinnerJumpComponent,
    SpinnerEllipsisComponent,

  ],
  imports: [
    CommonModule
  ],
  exports:[
    SpinnerJumpComponent,
    SpinnerEllipsisComponent,
  ]
})
export class SharedSpinnerModule { }
