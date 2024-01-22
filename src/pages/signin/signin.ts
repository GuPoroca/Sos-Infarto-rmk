import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, Loading, LoadingController, NavController, NavParams, TextInput } from 'ionic-angular';

import { AuthService } from './../../providers/auth.service';
import { PrincipalPage } from './../principal/principal';
import { CallNumber } from '@ionic-native/call-number';
import { SignupPage } from './../signup/signup';
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  @ViewChild('focusInput') inputEmail: TextInput;
  signinForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private callNumber: CallNumber,
    public navParams: NavParams
  ) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  ionViewDidEnter() {

    setTimeout(() => {
      this.inputEmail.setFocus();
    },150);

  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();

    this.authService.signinWithEmail(this.signinForm.value)
      .then((isLogged: boolean) => {

        if (isLogged) {
          this.navCtrl.setRoot(PrincipalPage);
          loading.dismiss();
        }

      }).catch((error: any) => {
        loading.dismiss();
        this.showAlert(error);
      });

  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onRecuperarSenha(): void {
    this.navCtrl.push(RecuperarSenhaPage);
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

  onAcionarEmergencia(): void {
    this.callNumber.callNumber("192", true)
      .then(res => console.log('Efetuando chamada.', res))
      .catch(err => console.log('Erro ao efetuar chamada.', err));
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
