import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Teams } from '../teams/teams';
import { EliteApi } from '../../shared/shared';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html'
})
export class Tournaments {

  tournaments:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private eliteApi: EliteApi, 
    private loadingController: LoadingController ) {
 
  }

  itemTapped($event, tourney){
    this.navCtrl.push(Teams,tourney);
  }

  ionViewDidLoad(){
    //console.log('## lifecycle ## ionViewDidLoad')
    let loader = this.loadingController.create({
      content: 'Gettting tournaments...'
    });

    loader.present().then(()=> {
        this.eliteApi.getTournaments().then(data => {
          this.tournaments = data;
          loader.dismiss();
        });  
    });
  }
  

}
