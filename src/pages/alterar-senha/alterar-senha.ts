import { UserService } from './../../providers/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../providers/auth.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, TextInput } from 'ionic-angular';
import { User } from './../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-alterar-senha',
  templateUrl: 'alterar-senha.html',
})
export class AlterarSenhaPage {
  @ViewChild('focusInput') inputEmail: TextInput;

  signinForm: FormGroup;

  constructor(public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

  }
  currentUser: User = new User();

  ionViewDidEnter() {

    /*setTimeout(() => {
      this.inputEmail.setFocus();
    },150); */

  }

  onSubmit(): void {
    /*debugger


    let formUser = this.signinForm.value;
    let username: string = formUser.username;

    this.userService.userExists(username)
      .first()
      .subscribe((userExists: boolean) => {

        if (userExists) {

          this.userService.editPassword({
            email: formUser.email,
            password: formUser.password
          }).then((userService: firebase.User) => {

            delete formUser.password;
            let uuid: string = authUser.uid;

            this.userService.create(formUser, uuid)
              .then(() => {
                this.showAlert(`Usuário cadastrado com Sucess`);

              }).catch((error: any) => {
                console.log(error);
                this.showAlert(error);
              });
          }).catch((error: any) => {
            console.log(error);
            this.showAlert(error);
          });
        } else {

          this.showAlert(`O username ${username} já está sendo usado em outra conta!`);

        }

      });*/

  }



 // private showAlert(message: string): void {
   // this.alertCtrl.create({
     // message: message,
      //buttons: ['Ok']
    //}).present();
  //}

}
