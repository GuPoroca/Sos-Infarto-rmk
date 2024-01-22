import { MapPage } from './../map/map';
import { PrincipalPage } from './../principal/principal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

import { AuthService } from './../../providers/auth.service';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user.service';
import { Sinais } from '../../models/sinais.model';

import { ContatosPage } from '../contatos/contatos';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-sinais-infarto',
  templateUrl: 'sinais-infarto.html',
})
export class SinaisInfartoPage {

  sinaisInfartoForm: FormGroup;
  sinais: Array<Sinais> = [];
  currentUser: User = new User();
  resultado: number = 0;
  historia: string;

  public sn_dor_peito: boolean = false;
    public sn_queima: boolean = false;
    public sn_aperto: boolean = false;
    public sn_irradia: boolean = false;
    public sn_superiores: boolean = false;
    public sn_pescoco: boolean = false;
    public sn_tempo: boolean = false;
    public qtdTempo: string;
    public sn_sudorese: boolean = false;
    public sn_nausea: boolean = false;
    public sn_vomito: boolean = false;
    public sn_dispneia: boolean = false;
    public sn_tontura: boolean = false;
    public sn_pontada: boolean = false;
    public escoreSinais: number;

  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public callNumber: CallNumber
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

        if(this.currentUser.escoreHistoria <= 4) {
          this.historia = 'baixo';

        } else if(this.currentUser.escoreHistoria > 4 && this.currentUser.escoreHistoria <= 8) {
          this.historia = 'intermediario';

        } else if(this.currentUser.escoreHistoria >= 9) {
          this.historia = 'alto';

        }
      });

      this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .first()
      .subscribe((currentUser: User) => {
        this.db.list(`/users/${currentUser.$key}/sinais`).valueChanges().subscribe((items: Sinais[]) => {
          this.sinais = items;
        });
      });
  }



  onHomePage(): void {
    let loading: Loading = this.showLoading();
    this.navCtrl.setRoot(PrincipalPage);
    loading.dismiss();
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    this.editUser();
  }

  unchecked() {
    if(!this.sn_dor_peito) {
      this.sn_queima = false;
      this.sn_aperto = false;
      this.sn_irradia = false;
      this.sn_irradia = false;
      this.sn_superiores = false;
      this.sn_pescoco = false;
    }
  }

  uncheckedIrradia() {
    if(!this.sn_irradia) {
      this.sn_superiores = false;
      this.sn_pescoco = false;
    }
  }

  private editUser(): void {
    let id = this.sinais.length;
    this.escoreSinais = 0;

    if(this.sn_dor_peito) {
      this.escoreSinais = 0;
      this.escoreSinais += 4;

    }

      if(this.sn_dor_peito && this.qtdTempo == 'mais') {
        this.escoreSinais = 0;
        this.escoreSinais += 5;

      }

    if(this.sn_dor_peito &&
      (this.sn_sudorese || this.sn_nausea ||
      this.sn_vomito || this.sn_dispneia || this.sn_tontura)) {

        this.escoreSinais = 0;
        this.escoreSinais += 5;
    }

    if(this.sn_dor_peito && this.historia == 'baixo'
      && !this.sn_queima && !this.sn_aperto
      && !this.sn_irradia && !this.sn_superiores
      && !this.sn_pescoco && !this.sn_sudorese
      && !this.sn_nausea && !this.sn_vomito
      && !this.sn_dispneia && !this.sn_tontura
      && !this.sn_pontada) {

        this.escoreSinais = 0;
        this.escoreSinais += 5;
    } else if(this.sn_dor_peito && this.historia == 'intermediario'
      && !this.sn_queima && !this.sn_aperto
      && !this.sn_irradia && !this.sn_superiores
      && !this.sn_pescoco && !this.sn_sudorese
      && !this.sn_nausea && !this.sn_vomito
      && !this.sn_dispneia && !this.sn_tontura
      && !this.sn_pontada) {

        this.escoreSinais = 0;
        this.escoreSinais += 6;
    } else if(this.sn_dor_peito && this.historia == 'alto'
      && !this.sn_queima && !this.sn_aperto
      && !this.sn_irradia && !this.sn_superiores
      && !this.sn_pescoco && !this.sn_sudorese
      && !this.sn_nausea && !this.sn_vomito
      && !this.sn_dispneia && !this.sn_tontura
      && !this.sn_pontada) {

        this.escoreSinais = 0;
        this.escoreSinais += 7;
    }

    if(this.sn_sudorese || this.sn_nausea ||
      this.sn_vomito || this.sn_dispneia || this.sn_tontura) {

        this.escoreSinais += 1;
    }
    let novoSinais: Sinais = {
      "sn_dor_peito": this.sn_dor_peito,
      "sn_queima": this.sn_queima,
      "sn_aperto": this.sn_aperto,
      "sn_irradia": this.sn_irradia,
      "sn_superiores": this.sn_superiores,
      "sn_pescoco": this.sn_pescoco,
      "sn_tempo": this.sn_tempo,
      "sn_sudorese": this.sn_sudorese,
      "sn_nausea": this.sn_nausea,
      "sn_vomito": this.sn_vomito,
      "sn_dispneia": this.sn_dispneia,
      "sn_tontura": this.sn_tontura,
      "sn_pontada": this.sn_pontada
    };
    this.sinais[id] = novoSinais;
    id = id + 1; 
    if(this.escoreSinais <= 4){
      this.sinaisBaixo();
    } else if(this.escoreSinais == 5) {
      this.sinaisIntermediario();
    } else if(this.escoreSinais >= 6) {
      this.sinaisAlto();
    }
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

 // private showAlert(message: string): void {
   // this.alertCtrl.create({
     // message: message,
      //buttons: ['Ok']
    //}).present();
 // }

  sinaisBaixo(): void {
    this.alertCtrl.create({
        title: 'Risco Baixo',
        message: 'Você está com risco baixo, deseja telefonar para o seu contato de emergência?',
        buttons: [
            {
                text: 'Sim',
                handler: () => {
                  let loading: Loading = this.showLoading();
                  this.userService
                  .editSinais(this.sinais).then(() => {
                    this.navCtrl.push(ContatosPage);
                    loading.dismiss();
                  });

                }
            },
            {
              text: 'Não',
              handler: () => {
                let loading: Loading = this.showLoading();
                this.userService
                .editSinais(this.sinais).then(() => {
                  this.navCtrl.setRoot(PrincipalPage);
                  loading.dismiss();
                });
              }
            }
        ]
    }).present();
  }
  addSinais(){
    
  }
  sinaisIntermediario(): void {
    this.alertCtrl.create({
        title: 'Risco Intermediario',
        message: 'Você está com risco intermediario, deseja pesquisar uma unidade de saúde?',
        buttons: [
            {
              text: 'Sim',
              handler: () => {
                let loading: Loading = this.showLoading();
                this.userService
                .editSinais(this.sinais).then(() => {
                  this.navCtrl.push(MapPage);
                  loading.dismiss();
                });
              }
            },
            {
              text: 'Não',
              handler: () => {
                let loading: Loading = this.showLoading();
                this.userService
                .editSinais(this.sinais).then(() => {
                  this.navCtrl.setRoot(PrincipalPage);
                  loading.dismiss();
                });
              }
            }
        ]
    }).present();
  }

  sinaisAlto(): void {
    this.alertCtrl.create({
        title: 'Risco Alto',
        message: 'Você está com risco alto, deseja acionar o SAMU?',
        buttons: [
            {
                text: 'Sim',
                handler: () => {
                  this.onAcionarEmergencia();

                }
            },
            {
              text: 'Não',
              handler: () => {
                let loading: Loading = this.showLoading();
                this.userService
                .editSinais(this.sinais).then(() => {
                  this.navCtrl.setRoot(PrincipalPage);
                  loading.dismiss();
                });
              }
            }
        ]
    }).present();
  }

  onAcionarEmergencia(): void {
    this.callNumber.callNumber("192", true)
      .then(res => console.log('Efetuando chamada.', res))
      .catch(err => console.log('Erro ao efetuar chamada.', err));
  }

}
