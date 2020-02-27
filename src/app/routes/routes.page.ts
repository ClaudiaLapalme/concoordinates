import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
})
export class RoutesPage implements OnInit {

  from: string;
  to: string;

   form: FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      from: ['Concordia University'],
      to: ['Loyola Campus'],
      departAt: ['Depart At'],
      time: ['18:00']

    });

  }

  getRoutes(transportMode: string){
    console.log(transportMode);
    
  }

}
