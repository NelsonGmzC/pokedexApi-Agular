import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {

  selectPokemonGen = 1;

  @Output() pokemonSelectGen = new EventEmitter<number>();

  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.selectPokemonGen);
  }

  ngOnInit(): void {
  }

}
