import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MyTeams,Tournaments,TeamDetail,Teams,Game, Standings, TeamHome, MapPage } from '../pages/pages';
import {HttpModule } from  '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';
 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MyTeams,Tournaments,TeamDetail,Teams,Game, Standings, TeamHome,MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBkdi0HPWqpo5-4nlC2U7L2CSrbI2z8gpU'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MyTeams,Tournaments,TeamDetail,Teams,Game, Standings, TeamHome,MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
