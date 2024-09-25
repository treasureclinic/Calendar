import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { SplitterModule } from 'primeng/splitter';
import { PasswordModule } from 'primeng/password';
import { ChartModule } from 'primeng/chart';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';

export const PrimeNgSharedModule = [
  CommonModule,
  ButtonModule,
  TableModule,
  DialogModule,
  InputTextModule,
  CalendarModule,
  DropdownModule,
  ToastModule,
  TooltipModule,
  MenubarModule,
  CardModule,
  DividerModule,
  RadioButtonModule,
  InputTextareaModule,
  InputSwitchModule,
  MultiSelectModule,
  SplitterModule,
  PasswordModule,
  ChartModule,
  ToolbarModule,
  AvatarModule
];

export const AngularSharedModule = [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
]