import { PrevencaoPage } from './../prevencao/prevencao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { UserService } from './../../providers/user.service';
import { User } from './../../models/user.model';

/**
 * Generated class for the SaibaMaisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saiba-mais',
  templateUrl: 'saiba-mais.html',
})
export class SaibaMaisPage {

  currentUser: User = new User();

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public alertCtrl2: AlertController,
    public alertCtrl3: AlertController,
    public navParams: NavParams,
    public userService: UserService) {
  }

  ionViewDidLoad() {
    this.userService.currentUser
      .valueChanges()
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  }

  onPrevencao() {
    this.navCtrl.push(PrevencaoPage);
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: "O Infarto",
      subTitle: "Ocorre quando uma ou mais artérias que levam oxigênio ao coração (chamadas artérias coronárias) são obstruídas abruptamente por um coágulo de sangue formado em cima de uma placa de gordura (ateroma) existente na parede interna da artéria.",
      buttons: ["OK"]
    });
    alert.present();
  }
  showAlert2() {
    const alert = this.alertCtrl2.create({
      title: "A Presença",
      subTitle: " De placas de gordura no sangue é chamada de aterosclerose (placa de colesterol). O paciente que possui placas de aterosclerose com algum grau de obstrução na luz de uma artéria tem a chamada DAC – doença arterial coronariana. Conforme a placa de gordura (ateroma) cresce, ela leva à obstrução cada vez maior da coronária e pode levar ao sintoma de dor no peito aos esforços (angina). Em geral, uma pessoa tem sintoma de dor no peito aos esforços quando a obstrução é maior que 70%.",
      buttons: ["OK"]
    });
    alert.present();
  }
  showAlert3() {
    const alert = this.alertCtrl3.create({
      title: "Causa Incomum de Infarto",
      subTitle: "São espasmos de uma artéria coronária, que podem ser capazes de interromper o fluxo de sangue a uma parte do músculo cardíaco. Drogas, como a cocaína, podem causar tal espasmo. Um ataque cardíaco também pode ocorrer devido a uma ruptura na artéria do coração, ou coágulos que viajaram de outras partes do corpo pelo sangue. Infarto também pode ocorrer se o fluxo sanguíneo para o coração é severamente diminuído, em situações como a pressão arterial muito baixa (choque).",
      buttons: ["OK"]
    });
    alert.present();
  }

}
