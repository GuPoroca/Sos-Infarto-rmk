import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";

import { UserService } from "./../../providers/user.service";
import { User } from "./../../models/user.model";

@IonicPage()
@Component({
  selector: "page-prevencao",
  templateUrl: "prevencao.html"
})
export class PrevencaoPage {
  currentUser: User = new User();

  constructor(
    public navCtrl: NavController,
    public alertCtrl1: AlertController,
    public alertCtrl2: AlertController,
    public alertCtrl3: AlertController,
    public alertCtrl4: AlertController,
    public alertCtrl5: AlertController,
    public alertCtrl6: AlertController,
    public alertCtrl7: AlertController,
    public alertCtrl8: AlertController,
    public alertCtrl9: AlertController,
    public alertCtrl10: AlertController,
    public navParams: NavParams,
    public userService: UserService
  ) {}

  ionViewDidLoad() {
    this.userService.currentUser.valueChanges().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  onSaibaMais() {
    this.navCtrl.pop();
  }

  showAlert() {
    const alert = this.alertCtrl1.create({
      title: "Siga uma dieta equilibrada",
      subTitle:
        "Bem não significa comer muito. É importante que a alimentação contemple frutas, verduras, legumes e carboidratos, pois isso reflete no colesterol. Uma dieta balanceada auxilia o organismo a equilibrar proteínas e nutrientes.",
      buttons: ["OK"]
    });
    alert.present();
  }

  showAlert2() {
    const alert = this.alertCtrl2.create({
      title: "Vá ao médico regularmente",
      subTitle:
        "Não só quem tem histórico de doenças cardiovasculares na família precisa buscar orientação médica. Com exames de rotina é possível analisar os níveis de açúcar e colesterol no organismo.",
      buttons: ["OK"]
    });
    alert.present();
  }

  showAlert3() {
    const alert = this.alertCtrl3.create({
      title: "Fique de olho na sua faixa etária",
      subTitle:
        "Apesar de o infarto aparecer em muitas pessoas mais jovens, entre 18 e 40 anos, os idosos ainda são o grupo de maior risco da doença. Geralmente, eles já desenvolveram hipertensão ou diabetes ao longo dos anos, o que dificulta os tratamentos, pois podem essas doenças podem acarretar lesões nos rins e no coração.",
      buttons: ["OK"]
    });
    alert.present();
  }

  showAlert4() {
    const alert = this.alertCtrl4.create({
      title: "Evite o tabagismo",
      subTitle:
        "As substâncias do cigarro destroem o endotélio, camada de proteção das veias, e oxidam as artérias, deixando-as suscetíveis ao contato da gordura do organismo, o que ocasiona a formação de depósito de gordura em locais inadequados.",
      buttons: ["OK"]
    });
    alert.present();
  }

  showAlert5() {
    const alert = this.alertCtrl5.create({
      title: "Atenção com diabéticos e hipertensos",
      subTitle:
        "O ideal é seguir as dietas e os tratamentos indicados. Controlar o peso e o consumo de alimentos gordurosos é o melhor a fazer nesse caso.",
      buttons: ["OK"]
    });
    alert.present();
  }

  showAlert6() {
    const alert = this.alertCtrl6.create({
      title: "Pratique exercícios",
      subTitle: "O que tem se notado é que a parcela mais jovem que apresenta níveis altos de colesterol também é sedentária. A prática de atividade física contribui para evitar infartos e diversas outras doenças, tais como hipertensão, diabetes e o sobrepeso.",
      buttons: ["OK"]
    });
    alert.present();
  }
  showAlert7() {
    const alert = this.alertCtrl7.create({
      title: "Consuma gordura saudável",
      subTitle: "As gorduras fazem parte da nossa alimentação, porém é preciso atenção para consumir somente as gorduras saudáveis, que podem ser encontradas no azeite, no chocolate meio amargo, na castanha-do-pará e também no abacate. São as chamadas gorduras polinsaturadas, de origem vegetal.",
      buttons: ["OK"]
    });
    alert.present();
  }
  showAlert8() {
    const alert = this.alertCtrl8.create({
      title: "Evite o consumo exagerado de bebidas alcoólicas",
      subTitle: "Elas não têm uma ligação direta com os infartos, mas, em excesso, prejudicam muito a saúde. Os estudos epidemiológicos afirmam que substâncias como o vinho, em pequenas doses, podem ajudar o sistema cardiológico do corpo, uma das explicações está no fato de a bebida funcionar como antioxidante no organismo, produzindo efeitos positivos como a redução do risco de derrames cerebrais",
      buttons: ["OK"]
    });
    alert.present();
  }
  showAlert9() {
    const alert = this.alertCtrl9.create({
      title: "Alerte seu médico sobre os casos de infarto na família",
      subTitle: "É importante fazer um acompanhamento mais aprofundado, pois a chance de desenvolver a doença é muito maior.",
      buttons: ["OK"]
    });
    alert.present();
  }
  showAlert10() {
    const alert = this.alertCtrl10.create({
      title: "Abuse da diversão e do entretenimento",
      subTitle: "É importante saber administrar o estresse emocional. Pessoas muito aceleradas e que trabalham demais estão suscetíveis aos infartos. Divirta-se, pois atividades prazerosas liberam a endorfina e equilibram o organismo.",
      buttons: ["OK"]
    });
    alert.present();
  }
}
