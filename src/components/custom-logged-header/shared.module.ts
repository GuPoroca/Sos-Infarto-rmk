import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { CustomLoggedHeaderComponent } from './custom-logged-header.component';

@NgModule({
  declarations: [
    CustomLoggedHeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CustomLoggedHeaderComponent,
    CommonModule
  ]
})
export class SharedModule { }