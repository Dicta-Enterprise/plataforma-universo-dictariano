import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerJumpComponent } from './spinner-jump/spinner-jump.component';



@NgModule({
  declarations: [
    SpinnerJumpComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SpinnerJumpComponent
  ]
})
export class SharedSpinnerModule { }
