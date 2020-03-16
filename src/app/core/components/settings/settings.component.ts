import { Component, EventEmitter, Output } from '@angular/core';
import { Storage } from '@ionic/storage';

import IconsMovetoPath from '../../../../assets/icon/icons-moveto-paths.json';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

  checked: boolean = false;
  displayAccessibility: boolean = false;
  downArrowIcon: string = IconsMovetoPath['up-arrow'];
  upArrowIcon: string = IconsMovetoPath['down-arrow'];
  leftArrowIcon: string = IconsMovetoPath['left-arrow'];

  @Output() closeSettings = new EventEmitter();

  constructor(private storage: Storage) { 
      this.storage.get('color-mode').then((currentColorMode) => {
          if(currentColorMode === 'dark'){
            this.checked = true;
            }
      });
  }

  
  changeColorMode(): void {

    if (this.checked) {
        this.storage.set('color-mode', 'light');
    }
    else {
        this.storage.set('color-mode', 'dark');
    }
    document.body.classList.toggle('dark', !this.checked);
  }

  toggleAccessiblity(): void{

    this.displayAccessibility = !this.displayAccessibility;
  }

  goBackToMenu(): void{
    this.closeSettings.emit();
  }
}
