import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  pokemonSelectTable: any;
  pokemonSelectGen: number = 1;

  ngOnInit(): void {
  }
}
