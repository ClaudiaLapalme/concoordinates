import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storage: Storage
    ) {
        this.initializeApp();
    }

    initializeApp(): void {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });

        this.storage.get('color-mode').then((currentColorMode) => {
            if(currentColorMode === 'dark'){
                document.body.classList.toggle('dark', true);
              }
          });
    }
}
