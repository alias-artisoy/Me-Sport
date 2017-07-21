import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,LoadingController,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { MyTeams,Tournaments,TeamHome } from '../pages/pages';
import { EliteApi, UserSettings } from '../shared/shared';

@Component({
  templateUrl: 'app.html',
  providers:[
    EliteApi,
    UserSettings,
    Storage
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeams;
  favoriteTeams: any[];

  pages: Array<{title: string, component: any}>;

  constructor(    
    public loadingController: LoadingController,
    public platform: Platform,
    public eliteApi: EliteApi,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private userSettings: UserSettings,
    private events: Events) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavorites();
      this.events.subscribe('favorites:changed', () => this.refreshFavorites());
    });
  }

  goHome() {
    this.nav.push(MyTeams);
  }
  
  refreshFavorites(){
     this.userSettings.getAllFavorites().then(favs => this.favoriteTeams = favs)
  }
  goToTournaments(){
    this.nav.push(Tournaments);
  }

  goToTeam(favorite){
    let loader = this.loadingController.create({
        content: 'Getting data...',
        dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHome, favorite.team));
  }
}
