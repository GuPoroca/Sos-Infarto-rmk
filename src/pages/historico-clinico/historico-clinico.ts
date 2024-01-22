import { PrincipalPage } from './../principal/principal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from './../../providers/auth.service';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user.service';
import { Contato } from '../../models/contato.model';
import { ContatosPage } from '../contatos/contatos';

@Component({
  selector: 'page-historico-clinico',
  templateUrl: 'historico-clinico.html',
})
export class HistoricoClinicoPage {

  historicoClinicoForm: FormGroup;
  currentUser: User = new User();
  contatos: Array<Contato> = [];
  calculo: number;
  calculoRCQ: number;
  imc: string;
  resultadoRCQ: string;
  resultado: string;
  calculoRCQCampo: string;

  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase
  ) {
    this.historicoClinicoForm = this.formBuilder.group({
      peso: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      altura: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
      idade: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
      sexo: ['', [Validators.required]]
    });

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;

  }

  ionViewDidLoad() {
    this.userService.currentUser
      .valueChanges()
      .subscribe((user: User) => {
        this.currentUser = user;
        this.currentUser.escoreHistoria = 0;
        this.calculaIMC();
        this.calculoCinturaQuadril();
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

  calculaIMC() {
    this.calculo = (this.currentUser.peso / Math.pow(this.currentUser.altura, 2))*10000;
    this.imc = this.calculo.toFixed(2);

    if(this.calculo < 18.5) {
      this.resultado = "Você está abaixo do peso com esse índice: " + this.imc;
    } else if(this.calculo >= 18.5 && this.calculo < 24.9) {
      this.resultado = "Você está com peso ideal com esse índice: " + this.imc;
    } else if (this.calculo >= 25 && this.calculo < 29.9) {
      this.resultado = "Você está com sobrepeso com esse índice: " + this.imc;
    } else if(this.calculo > 30 ) {
      this.resultado = "Você está com obesidade com esse índice: " + this.imc;
    }
  }

  calculoCinturaQuadril() {
    this.calculoRCQ = (this.currentUser.cintura / this.currentUser.quadril)*100;
    this.calculoRCQCampo = this.calculoRCQ.toFixed(2);
    if(this.currentUser.sexo == 'masculino' && this.calculoRCQ >= 94) {
      this.resultadoRCQ = "SIM";
    } else if(this.currentUser.sexo == 'feminino' && this.calculoRCQ >= 80) {
      this.resultadoRCQ = "SIM";
    } else {
      this.resultadoRCQ = "NÃO";
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    this.editUser();
  }

  private editUser(): void {
    if(this.currentUser.sn_hipertensao && this.currentUser.sn_diabetes && this.currentUser.sn_tabagismo) {
      this.currentUser.escoreHistoria = 0;
      this.currentUser.escoreHistoria += 1;

    }

    if(this.currentUser.sn_hipertensao && this.currentUser.sn_diabetes && this.currentUser.sn_tabagismo &&
              ((this.currentUser.sexo == 'feminino' && this.calculoRCQ >= 80) || (this.currentUser.sexo == 'masculino' && this.calculoRCQ >= 94))) {
                this.currentUser.escoreHistoria = 0;
                this.currentUser.escoreHistoria += 2;

    }

    if(this.currentUser.sn_hipertensao && this.currentUser.sn_diabetes && this.currentUser.sn_tabagismo &&
      ((this.currentUser.sexo == 'feminino' && this.calculoRCQ >= 80) || (this.currentUser.sexo == 'masculino' && this.calculoRCQ >= 94))
       && this.currentUser.sn_frutas) {
        this.currentUser.escoreHistoria = 0;
        this.currentUser.escoreHistoria += 3;
    }

    if(!this.currentUser.sn_frutas && !this.currentUser.sn_atividade_fisica) {
      this.currentUser.escoreHistoria += 2;
    }

    if(this.currentUser.idade < 60) {
      this.currentUser.escoreHistoria += 1;
    } else if(this.currentUser.idade >= 60) {
      this.currentUser.escoreHistoria += 2;
    }

    if(this.currentUser.sn_infartou) {
      this.currentUser.escoreHistoria += 2;
    }

    if(this.contatos.length == 0) {
      this.alertaContatos();
    } else {
      let loading: Loading = this.showLoading();
      this.userService
      .editHistorico(this.currentUser).then(() => {
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

  alertaContatos(): void {
    this.alertCtrl.create({
        title: 'Atenção',
        message: 'Identificamos que você não tem nenhum contato de emergência/medico assistente cadastrado, deseja cadastrar agora?',
        buttons: [
            {
                text: 'Sim',
                handler: () => {
                  //let loading: Loading = this.showLoading();
                  this.userService
                  .editHistorico(this.currentUser).then(() => {
                    this.navCtrl.setRoot(ContatosPage);
                    //loading.dismiss();
                  });

                }
            },
            {
              text: 'Não',
              handler: () => {
                //let loading: Loading = this.showLoading();
                this.userService
                .editHistorico(this.currentUser).then(() => {
                  this.navCtrl.setRoot(PrincipalPage);
                  //loading.dismiss();
                });
              }
            }
        ]
    }).present();
  }

}
