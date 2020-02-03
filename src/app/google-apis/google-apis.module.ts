import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectionsService } from './directions/directions.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [DirectionsService]
})
export class GoogleApisModule { }
