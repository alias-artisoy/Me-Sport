import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../shared/shared';
import _ from 'lodash';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html'
})
export class Standings {
  allStandings: any[];
  divisionFilter = 'division';
  standings: any[];
  team: any;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApi) { }

  ionViewDidLoad() { 
    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;

     this.allStandings =
       _.chain(this.standings)
        .groupBy('division')
        .toPairs()
        .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
       .value();

    console.log('standings:', this.standings); 
    //console.log('division Standings', this.allStandings);
  }


}
