import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transit-line-indicator',
  templateUrl: './transit-line-indicator.component.html',
  styleUrls: ['./transit-line-indicator.component.scss'],
})
export class TransitLineIndicatorComponent implements OnInit {

  @Input() line: string;
  @Input() color: string;
  constructor() { }

  ngOnInit() {}

}
