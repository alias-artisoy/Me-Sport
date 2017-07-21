import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { EliteApi } from '../../shared/shared';
declare var window: any;

@Component({
  templateUrl: 'map.page.html'
})
export class MapPage {

  map: any = {};
  title: string = 'My first angular2-google-maps project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(public navParams: NavParams, public eliteApi: EliteApi) {
    
/*    let games = this.navParams.data;
     console.log(games)
  let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[games.LocationId];
    
     this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location 
    };
console.log(tourneyData.locations)*/
  }

  ionViewDidLoad(){
    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location 
    };
console.log(tourneyData.locations)
 window.location = `geo:${this.lat},${this.lng};u=35`; 
  }



  getDirections() { 
    window.location = `geo:${this.lat},${this.lng};u=35`; 
  }

}
