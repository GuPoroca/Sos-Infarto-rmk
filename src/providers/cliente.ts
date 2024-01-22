import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';


 /* Generated class for the ClienteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.*/

@Injectable()
export class ClienteProvider {
  server: string = "http://localhost:8800/users";
  constructor(public http: Http) {

  }
  postData(body, file){
    let type = "application/json; charset=UTF-8";
    let headers = new Headers({'Content-Type': type});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.server + file, JSON.stringify(body), options)
    .pipe(
      map(res => res.json()),
      catchError(this.handleError)
    );
}

private handleError(error: any) {
  console.log('Erro:', error);

  if (error.status === 0) {
    console.log('Não foi possível conectar ao servidor');
  } else {
    console.log('Erro inesperado. Status:', error.status);
    // Aqui você pode tomar medidas específicas com base no código de status
    // Por exemplo, redirecionar para uma página de erro, exibir uma mensagem específica, etc.
  }

  return Observable.throw(error);
}
}

/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ClienteProvider {
  private serverUrl = 'http://localhost/projetoInfarto/db_sosInfarto/aksi_user.php';

  constructor(private http: HttpClient) { }

  postData(dados: any): Observable<any> {
    return this.http.post(this.serverUrl, dados);
  }
}*/

