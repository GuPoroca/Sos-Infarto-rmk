import { Contato } from './contato.model';
import { Sinais } from './sinais.model';
export class User {

    public $key: string;

    // constructor(
    public name: string;
    public username: string;
    public email: string;
    public photo: string;
    
    /*Histórico Clínico*/
    public sexo: string;
    public peso: number;
    public altura: number;
    public idade: number;
    public sn_infartou: boolean = false;
    public sn_hipertensao: boolean = false;
    public sn_hipertensao_medicacao: boolean = false;
    public sn_diabetes: boolean = false;
    public sn_diabetes_medicacao: boolean = false;
    public sn_colesterol: boolean = false;
    public sn_colesterol_medicacao: boolean = false;
    public cintura: number;
    public quadril: number;
    public sn_tabagismo: boolean = false;
    public sn_atividade_fisica: boolean = false;
    public sn_frutas: boolean = false;
    public sn_alcool: boolean = false;
    public escoreHistoria: number;
    
    /*Sinais e sintomas*/
    // ) {}

    public sinais: Array<Sinais> = [];
    public contatos: Array<Contato> = [];

    /*{
        "rules": {
            ".read": "auth != null",
            ".write": "auth != null",
            "users": {
                ".read": true,
                ".write": true,
                ".indexOn": ["username", "name"]
            },
            "chats": {
                ".indexOn": "timestamp"
            },
            "messages": {
                "$messages_list_id": {
                    ".indexOn": "timestamp"
                }
            }
        }
    }*/

}