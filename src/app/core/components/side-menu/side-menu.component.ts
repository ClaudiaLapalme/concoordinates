import { Component } from '@angular/core';
import { SettingsComponent } from './../settings';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {

  showMenu: boolean = true;
  showSettings: boolean = false;

  constructor() { }

  openSettings(): void {
    this.showSettings = true;
    this.showMenu = false;
  }

  closeSettings(): void{
    this.showSettings = false;
    this.showMenu = true;
  }
}
