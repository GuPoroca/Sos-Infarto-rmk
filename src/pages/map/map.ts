import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from './../../providers/auth.service';
import { UserService } from './../../providers/user.service';
import { User } from './../../models/user.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  startPosition: any;
  originPosition: string;
  destinationPosition: string;
  currentUser: User = new User();
  map: any;
  static hospital: any;
  hospitais: Array<any> = [];

  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public userService: UserService,
    private geolocation: Geolocation, 
    private platform: Platform,
    private inAppBrowser: InAppBrowser
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
      });

      this.initializeMap();
  }

  openNavigationApp(app: string, latitude: string, longitude, string) {
    let url;
  
    if (app === 'uber') {
      // Abrir o aplicativo Uber
      if (this.platform.is('ios')) {
        url = `uber://?action=setPickup&dropoff[latitude]=${latitude}&dropoff[longitude]=${longitude}`;
      } else if (this.platform.is('android')) {
        url = `uber://?action=setPickup&dropoff[latitude]=${latitude}&dropoff[longitude]=${longitude}`;
      }
    } 
    else if (app === 'maps') {
      // Abrir o aplicativo Google Maps
      url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    }
  
    // Abrir o aplicativo selecionado usando o InAppBrowser
    this.inAppBrowser.create(url, '_system');
  }

  /*formatOpeningHours(openingHours: any): string {
    let formattedHours = '';
  
    // Verifica se há dados de horário de funcionamento
    if (openingHours) {
      // Percorre cada dia da semana
      Object.keys(openingHours).forEach((day: string) => {
        const dayData = openingHours[day];
        const openTime = dayData.open;
        const closeTime = dayData.close;
        
        // Formata a string para exibir o dia e os horários de funcionamento
        formattedHours += `${day}: ${openTime} - ${closeTime}\n`;
      });
    }
  
    return formattedHours;
  }*/
  
  auxUpa(service, upa){
    const request = {
      query: upa
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
    
        // Adicione o primeiro resultado à lista de hospitais
        this.hospitais.push(results);
    
        // Restante do código
      } else {
        console.error(status);
      }
    });
  }

  initializeMap() {
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      console.log(position)
     const mapOptions = {
        disableDefaultUI: true,
        zoom: 16,
        center: position
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      this.directionsDisplay.setMap(this.map);

    

    this.startPosition = position;

    let service = new google.maps.places.PlacesService(this.map);

    const upas = [
      'UPA Barra de Jangada - Senador Wilson Campos',
      'UPA Cabo de Santo Agostinho - Deputado Francisco Julião',
      'UPA Caxangá - Escritor Paulo Cavalcanti',
      'UPA Curado - Médico Fernando de Lacerda',
      'UPA Engenho Velho - Governador Carlos Wilson',
      'UPA Ibura - Pediatra Zilda Arns',
      'UPA Imbiribeira - Maria Esther Souto Carvalho',
      'UPA Nova Descoberta - Solano Trindade',
      'UPA Olinda - Gregário Lourenço de Menezes',
      'UPA Paulista - Geraldo Pinho Alves',
      'UPA São Lourenço da Mata - Professor Fernando Figueira',
      'UPA Torrões - Dulce Sampaio',
      'UPA Caruaru - Dr. Horácio Florêncio',
      'UPA Igarassu - Honorata de Queiroz Gaivão',
      'UPA Petrolina - Dr. Emanoel Alírio Brandão'
    ];
    
    for (const upa of upas) {
      this.auxUpa(service, upa);
    }
    return new Promise((resolve,reject)=>{
    //service.nearbySearch({
    service.textSearch({
      location: this.startPosition,
      //radius: 50000,
      //type: ['hospital'],
      query: ['hospitais e UPA de referência em cardiologia'],
    }, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results)
        resolve(results);
      } else {
        reject(status);
      }
    });
    }).then((results : Array<any>)=>{
      this.hospitais[1] = results;
    });
    }).catch((error) => {
      console.log('Erro ao recuperar sua posição', error);
    });

  }
  

  calculateRoute(destino: string) {
    this.destinationPosition = destino;
    if (this.destinationPosition) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.startPosition,
        destination: this.destinationPosition,
        travelMode: 'DRIVING'
      };

      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }
}
