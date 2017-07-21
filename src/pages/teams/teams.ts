import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import _ from 'lodash';

import { TeamHome } from '../pages';
import { EliteApi } from '../../shared/shared'

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class Teams {
  private allTeams: any;
  private allTeamDivisions: any;
  teams = [];
  queryText: string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private eliteApi: EliteApi,
    private loadingController: LoadingController) {
 
  }

  ionViewDidLoad(){
    let selectedTourney = this.navParams.data;
    
    let loader = this.loadingController.create({
      content: 'Loading teams...'
    });

    loader.present().then(()=> {
        this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
          this.allTeams = data.teams;
          this.allTeamDivisions = 
          _.chain(data.teams)
          .groupBy('division')
          .toPairs()
          .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
          .value();

          this.teams = this.allTeamDivisions;
          console.log('division teams',this.allTeamDivisions)
          loader.dismiss();
      });
    });
  }

 itemTapped($event, team){
   this.navCtrl.push(TeamHome, team);
 }

  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });

    this.teams = filteredTeams;
    console.log(filteredTeams)
  }

}
