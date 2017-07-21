import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController } from 'ionic-angular';
import {  Tournaments,TeamHome } from '../pages' ;
import { UserSettings, EliteApi } from '../../shared/shared';
/**
 * Generated class for the MyTeams page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeams {
   favorites = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userSettings: UserSettings,
    private eliteApi: EliteApi,
    private loadingController: LoadingController) {
  }

  goToTournaments(){
  this.navCtrl.push(Tournaments)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeams');
  }

    
  favoriteTapped($event, favorite){
        let loader = this.loadingController.create({
            content: 'Getting data...'
        });
        loader.present();
        this.eliteApi.getTournamentData(favorite.tournamentId)
            .subscribe(t => {
                loader.dismiss();
                this.navCtrl.push(TeamHome, favorite.team);
            });
    }

  ionViewDidEnter(){
        //this.favorites = this.userSettings.getAllFavorites();
        this.userSettings.getAllFavorites().then(favs => this.favorites = favs);
    }
}
