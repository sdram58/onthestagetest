import { Component, OnInit } from '@angular/core';
import { Globales } from '../Globales';
import { Texto } from '../Texto';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  constructor(
    private GLOBALES:Globales,
    private Texto:Texto
  ) { }

  ngOnInit() {
  }

}
