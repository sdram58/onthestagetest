import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'in-spinner',
  templateUrl: './in-spinner.component.html',
  styleUrls: ['./in-spinner.component.scss']
})
export class InSpinnerComponent implements OnInit {

   //color="warn";
   mode="indeterminate";
   diameter="55";
   strokeWidth="3";
   //value="50";

  constructor() { }

  ngOnInit() {
  }

}
