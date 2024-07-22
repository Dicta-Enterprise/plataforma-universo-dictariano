import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {StyleClassModule} from 'primeng/styleclass'
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  exports:[StyleClassModule, ButtonModule, TableModule, DropdownModule, CalendarModule, InputTextModule, InputTextareaModule]
})
export class AdminPrimengModule { }
