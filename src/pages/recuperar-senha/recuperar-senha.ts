import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, Loading, LoadingController, NavController, NavParams, IonicPage, TextInput } from 'ionic-angular';

import { SigninPage } from './../signin/signin';
import { AuthService } from './../../providers/auth.service';

import { UserService } from '../../providers/user.service';

@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {

  @ViewChild('focusInput') inputEmail: TextInput;
  recuperaForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.recuperaForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
    });

  }

  ionViewDidEnter() {

    setTimeout(() => {
      this.inputEmail.setFocus();
    },150);

  }


  onSubmit(): void {

    let loading: Loading = this.showLoading();
    let formUser = this.recuperaForm.value;

    this.userService.emailExists(formUser.email)
      .first()
      .subscribe((emailExists: boolean) => {

        if (emailExists) {

          this.authService.confirmPasswordReset(formUser.email)
              .then((enviado: boolean) => {


                this.showAlert(`Acesse o e-mail ${formUser.email} para alterar a senha.`);
                this.navCtrl.setRoot(SigninPage);
                loading.dismiss();


          }).catch((error: any) => {
            loading.dismiss();
            this.showAlert(error);
          });

        } else {

          this.showAlert(`O e-mail ${formUser.email} não foi encontrado.`);
          loading.dismiss();

        }

      });

  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
