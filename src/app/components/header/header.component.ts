import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() pokemonSelectGen = new EventEmitter<number>();
  selectedGen: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  selectPokemonGen(value: number) {
    this.selectedGen = value;
    this.pokemonSelectGen.emit(value);
  }

}
