import { HistoricoClinicoPage } from "./../historico-clinico/historico-clinico";
import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AlertController,
  Loading,
  App,
  LoadingController,
  NavController,
  NavParams
} from "ionic-angular";

import "rxjs/add/operator/first";

import { AuthService } from "./../../providers/auth.service";
import { UserService } from "./../../providers/user.service";
//import { ClienteProvider } from "./../../providers/cliente";

import * as firebase from "firebase/app";

@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  signupForm: FormGroup;
  USER_NOME: string = "";
  USER_EMAIL: string = "";
  USER_SENHA: string = "";
  constructor(
    //private cliente: ClienteProvider,
    public alertCtrl: AlertController,
    public app: App,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(emailRegex)
        ])
      ],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
    }, {
      validator: this.passwordsMatch.bind(this)
    });
  }

  passwordsMatch(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password.value !== confirmPassword.value) {
      return { 'passwordsDoNotMatch': true };
    }
    return null;
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username;

    /*let body = {
      user_nome : formUser.username,
      user_senha : formUser.password,
      //aksi : 'add_user'
    };
    this.cliente.postData(body,"index.js")
    .subscribe(
      data => {
        // Lógica de sucesso aqui, se necessário.
        console.log('Sucesso:', data);
      },
      error => {
        // Lógica para lidar com erros aqui.
        console.log('Erroggggg:', error);
      }
    );*/
    this.userService
      .userExists(username)
      .first()
      .subscribe((userExists: boolean) => {
        if (!userExists) {

          this.authService
            .createAuthUser({
              email: formUser.email,
              password: formUser.password
            })
            .then((authUser: firebase.User) => {
              delete formUser.password;
              let uuid: string = authUser.uid;

              this.userService
                .create(formUser, uuid)
                .then(() => {
                  this.showAlert(`Usuário cadastrado com Sucesso!`);
                  this.navCtrl.setRoot(HistoricoClinicoPage);
                  loading.dismiss();
                })
                .catch((error: any) => {
                  loading.dismiss();
                  this.showAlert(error);
                });
            })
            .catch((error: any) => {
              loading.dismiss();
              this.showAlert(error);
            });
        } else {
          this.showAlert(
            `O Nome do Usuário ${username} já está sendo usado em outra conta!`
          );
          loading.dismiss();
        }
      });
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: "Please wait..."
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl
      .create({
        message: message,
        buttons: ["Ok"]
      })
      .present();
  }
}
