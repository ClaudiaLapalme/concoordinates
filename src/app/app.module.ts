import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule, CalendarService } from './core';
import { SharedModule } from './shared';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { RoutesPage } from './routes/routes.page';
import { SideMenuComponent } from './core/components';


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        SharedModule,
        CoreModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.config),
        AngularFireAuthModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        CoreModule,
        SharedModule,
        GooglePlus,
        SideMenuComponent,
        CalendarService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
