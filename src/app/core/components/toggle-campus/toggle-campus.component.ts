import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-campus',
  templateUrl: './toggle-campus.component.html',
  styleUrls: ['./toggle-campus.component.scss'],
})
export class ToggleCampusComponent {

  @Output() toggleChange = new EventEmitter();

  constructor() { }

  toggleCampus(): void {
    this.toggleChange.emit();
  }

}
