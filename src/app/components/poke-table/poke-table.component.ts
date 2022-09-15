import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss'],
})

export class PokeTableComponent implements OnChanges {

  @Output() pokemonSelect = new EventEmitter<any>();
  @Input() pokemonSelectGen: number = 1;
  pokemons: any[] = [];
  selectedItem: any;
  searchPk: string | undefined;
  dataSearchPk: any[] = [];

  constructor(
    private pokeService: PokemonService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchPk = '';
    this.pokemons = [];
    this.selectedItem = {};
    if (this.pokemonSelectGen === 1) {
      this.getPokemonsGen1();
    }
    if (this.pokemonSelectGen === 2) {
      this.getPokemonsGen2();
    }
  }

  ngOnInit(): void {
    this.getPokemonsGen1();
  }

  searchPokemon(value: any) {
    this.dataSearchPk = [];
    if (value.length == 0 || value.length == undefined) {
      this.dataSearchPk = [];
    } else {
      for(let i = 1; i <= this.pokemons.length; i++) {
        if (this.pokemons[i].name.includes(value)) {
          this.dataSearchPk.push(this.pokemons[i]);
        }
      }
    }
  }

  getPokemonsGen1() {
    for(let i = 1; i <= 151; i++) {
      this.pokeService.getPokemons(i).subscribe(
        res => {
          this.pokemons.push(res);
        },
        error => {
        }
      );
    }
    console.log(this.pokemons);
  }

  getPokemonsGen2() {
    for(let i = 152; i <= 251; i++) {
      this.pokeService.getPokemons(i).subscribe(
        res => {
          this.pokemons.push(res);
        },
        error => {
        }
      );
    }
  }

  selectPokemon(pokemon: any) {
    this.searchPk = '';
    this.pokemonSelect.emit(pokemon);
  }

  selectSearchPk(item: string) {
    this.searchPk = item;
    this.dataSearchPk = [];
  }
}