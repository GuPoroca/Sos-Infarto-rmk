import { PrincipalPage } from './../principal/principal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

import { AngularFireDatabase} from 'angularfire2/database';

import { AuthService } from './../../providers/auth.service';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user.service';
import { Contato } from '../../models/contato.model';


@IonicPage()
@Component({
  selector: 'page-contatos',
  templateUrl: 'contatos.html',
})
export class ContatosPage {

  currentUser: User = new User();
  contatos: Array<Contato> = [];
  canEdit: boolean = false;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public viewCtl: ViewController,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public userService: UserService,
    public callNumber: CallNumber) {

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

      this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .first()
      .subscribe((currentUser: User) => {
        this.db.list(`/users/${currentUser.$key}/contatos`).valueChanges().subscribe((items: Contato[]) => {
          this.contatos = items;
        });
      });
  }

  onSubmit(event: Event) {
    event.preventDefault();

  }

  private editContato(contato) {
    if(contato.telefone.length < 11) {
      this.showAlert('Numero de caracteres para o telefone está invalido.');
    } else {
      let loading: Loading = this.showLoading();
      this.userService
        .editContato(this.contatos)
        .then(() => {
           this.navCtrl.setRoot(PrincipalPage);
            loading.dismiss();
          });
      }
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

  findContatoIndex(id) {
    for (let i=0; i < this.contatos.length; i++) {
      if(this.contatos[i].id == id) {
        return i;
      }
    }
    return null;
  }

  changeContato(contato) {
    let index = this.findContatoIndex(contato.id);
    this.contatos[index] = contato;
  }

  remove(contato) {
    let index = this.findContatoIndex(contato.id);
    this.contatos.splice(index, 1);

    let loading: Loading = this.showLoading();
    this.userService
      .editContato(this.contatos)
      .then(() => {
          this.navCtrl.setRoot(PrincipalPage);
          loading.dismiss();
        });
  }

  ligar(contato) {
    if(contato.telefone.length < 11) {
      this.showAlert('Numero de caracteres para o telefone está invalido.');
    } else {
      this.callNumber.callNumber(contato.telefone, true)
        .then(res => console.log('Efetuando chamada.', res))
        .catch(err => console.log('Erro ao efetuar chamada.', err));
    }
  }

  addContato() {
    let id = this.contatos.length+1;
    this.contatos.push({"id": ''+id,
          "nome": "",
         "telefone": ""});
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
