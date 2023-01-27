import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { IconComponent } from './components/icon/icon.component';
import { TextFieldComponent } from './components/text-field/text-field.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,ButtonComponent, DatePickerComponent, IconComponent, TextFieldComponent
  ],
  exports:[CommonModule,ButtonComponent, DatePickerComponent, IconComponent, TextFieldComponent]
})
export class SharedModule { }
