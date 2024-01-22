import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContatosPage } from './contatos';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    ContatosPage,
  ],
  imports: [
    IonicPageModule.forChild(ContatosPage),
    IonicModule
  ],
})
export class ContatosPageModule {}
