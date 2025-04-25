import { NgModule } from '@angular/core';

import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
@NgModule({

  exports: [
    StyleClassModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    MultiSelectModule,
    TagModule,
    ToastModule,
    DialogModule,
    InputSwitchModule,
    BadgeModule,
    ProgressBarModule
    
  ],
})
export class ManagmentPrimengModule {}
