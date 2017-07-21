import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EliteApi} from '../../shared/shared';
import { TeamHome,MapPage } from '../pages';
declare var window: any;
@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class Game {
  game:any ;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private eliteApi: EliteApi) {
    this.game = this.navParams.data;

    this.game.gameTime = Date.parse(this.game.time);
  }

  ionViewDidLoad(){
   
    console.log(this.game.gameTime)
  }

  teamTapped(teamId:any){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team =  tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHome, team);
  }

  isWinner(score1, score2){
    //return Number(score1) > Number(score2);
    return Number(score1) > Number(score2) ? 'secondary' : '';
  }

  goToMap(){
    this.navCtrl.push(MapPage, this.game);
  }

  goToDirections(){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35;`;

    console.log(location.latitude);
    console.log(location.longitude);
  }
}
