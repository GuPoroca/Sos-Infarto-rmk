import { Contato } from './../models/contato.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';

import { FirebaseApp } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";

import { BaseService } from "./base.service";
import { User } from './../models/user.model';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Sinais } from '../models/sinais.model';

@Injectable()
export class UserService extends BaseService {

  users: Observable<User[]>;
  user: User = new User();
  currentUser: AngularFireObject<User>;
  storageRef = firebase.storage().ref();

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public firebaseApp: FirebaseApp,
    public http: Http
  ) {
    super();
    this.listenAuthState();
  }

  private setUsers(uidToExclude: string): void {
    this.users = this.mapListKeys<User>(
      this.db.list<User>(`/users`,
        (ref: firebase.database.Reference) => ref.orderByChild('username')
      )
    )
      .map((users: User[]) => {
        return users.filter((user: User) => user.$key !== uidToExclude);
      });
  }

  private listenAuthState(): void {
    this.afAuth
      .authState
      .subscribe((authUser: firebase.User) => {
        if (authUser) {
          console.log('Auth state alterado!');
          this.currentUser = this.db.object(`/users/${authUser.uid}`);
          this.setUsers(authUser.uid);
        }
      });
  }

  create(user: User, uuid: string): Promise<void> {
   /* this.user.name = user.name;
    this.user.username = user.username;
    this.user.email = user.email;
    this.user.contatos.push({
      "id": "1",
      "nome": "Exemplo",
      "telefone": "999999999"
    });*/
    return this.db.object(`/users/${uuid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

  edit(user: { name: string, username: string, photo: string }): Promise<void> {
    return this.currentUser
      .update(user)
      .catch(this.handlePromiseError);
  }

  editHistorico(user: User): Promise<void> {
    this.user
    return this.currentUser
      .update(user)
      .catch(this.handlePromiseError);
  }

  editSinais(sinais: Sinais[]): Promise<void> {
    this.user.sinais = sinais;
    return this.currentUser
      .update(this.user)
      .catch(this.handlePromiseError);
  }

  editContato(contatos: Contato[]): Promise<void> {
    this.user.contatos = contatos;
    return this.currentUser
      .update(this.user)
      .catch(this.handlePromiseError);
  }

  userExists(username: string): Observable<boolean> {
    return this.db.list(`/users`,
      (ref: firebase.database.Reference) => ref.orderByChild('username').equalTo(username)
    )
      .valueChanges()
      .map((users: User[]) => {
        return users.length > 0;
      }).catch(this.handleObservableError);
  }

  emailExists(email: string): Observable<boolean> {
    debugger
    return this.db.list(`/users`,
      (ref: firebase.database.Reference) => ref.orderByChild('email').equalTo(email)
    )
      .valueChanges()
      .map((users: User[]) => {
        return users.length > 0;
      }).catch(this.handleObservableError);
  }

  get(userId: string): AngularFireObject<User> {
    return this.db.object<User>(`/users/${userId}`);
  }

  uploadPhoto(file: File, userId: string): firebase.storage.UploadTask {
    return firebase.storage().ref().child(`/users/${userId}`).put(file);
  }

}
