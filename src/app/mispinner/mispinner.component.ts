import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'mispinner',
  templateUrl: './mispinner.component.html',
  styleUrls: ['./mispinner.component.scss']
})
export class MispinnerComponent implements OnInit {
  //color="warn";
  mode="indeterminate";
  diameter="55";
  strokeWidth="3";
  //value="50";

  constructor() { }

  ngOnInit() {
  }

}
