import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transit-line-indicator',
  templateUrl: './transit-line-indicator.component.html',
  styleUrls: ['./transit-line-indicator.component.scss'],
})
export class TransitLineIndicatorComponent implements OnInit {

  @Input() line: string;
  @Input() color: string;
  isBlackColor: boolean = false;
  constructor() { }

  ngOnInit() {    
    if(this.line === '9' && this.color.toLowerCase() === '#1f1f1f'){
      this.isBlackColor = true;
    }
  }

}
