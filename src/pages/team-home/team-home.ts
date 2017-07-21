import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Standings, TeamDetail, MyTeams } from '../pages';
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html'
})
export class TeamHome {
  teamDetailTab = TeamDetail;
  standingsTab = Standings;
  team: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
  } 

  goHome(){
    this.navCtrl.popToRoot();
  }

}
