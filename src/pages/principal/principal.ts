import { MapPage } from './../map/map';
import { SaibaMaisPage } from '../saiba-mais/saiba-mais';
import { SinaisInfartoPage } from './../sinais-infarto/sinais-infarto';
import { Component } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

import { AuthService } from './../../providers/auth.service';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user.service';


@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  currentUser: User = new User();
  view: string = 'S.O.S Infarto';

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public userService: UserService,
    public menuCtrl: MenuController,
    private callNumber: CallNumber
    ) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;

  }

  ionViewDidLoad() {
    this.userService.currentUser
      .valueChanges()
      .subscribe((user: User) => {
        this.currentUser = user;
      });

      this.menuCtrl.enable(true, 'user-menu');
  }

  onSinaisInfarto(): void {
    this.navCtrl.push(SinaisInfartoPage);
  }

  onUnidadesProxima(): void {
    this.navCtrl.push(MapPage);
  }

  onSaibaMais(): void {
    this.navCtrl.push(SaibaMaisPage);
  }

  onAcionarEmergencia(): void {
    this.callNumber.callNumber("192", true)
      .then(res => console.log('Efetuando chamada.', res))
      .catch(err => console.log('Erro ao efetuar chamada.', err));
  }

}
