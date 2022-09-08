import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscriber } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss'],
})

export class PokeTableComponent implements OnInit {

  pokemons: any[] = [];
  selectedItem: any;

  @Output() pokemonSelect = new EventEmitter<any>();

  constructor(
    private pokeService: PokemonService
  ) { }

  ngOnInit(): void {
    this.getPokemonsGen1();
  }

  getPokemonsGen1() {
    for(let i = 150; i <= 300; i++) {
      this.pokeService.getPokemons(i).subscribe(
        res => {
          this.pokemons.push(res);
          //console.log(res);
        },
        error => {
        }
      );
    }
  }

  selectPokemon(pokemon: any) {
    this.pokemonSelect.emit(pokemon);
  }
}