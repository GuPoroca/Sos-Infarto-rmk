import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrincipalPage } from './principal';
import { SharedModule } from '../../components/custom-logged-header/shared.module';

@NgModule({
  declarations: [
    PrincipalPage,
  ],
  imports: [
    IonicPageModule.forChild(PrincipalPage),
    SharedModule,
  ],
})
export class PrincipalPageModule {}
