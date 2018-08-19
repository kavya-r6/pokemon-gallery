import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PagerService } from '../services/pager.service';
import { PokemonInformation } from '../model/pokemonInformation.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  pokemons: PokemonInformation[] = [];
  filteredPokemons: PokemonInformation[] = [];
  loadingMessage = true;
  totalCount = 0;
  alerts: any[] = [];
  pager: any = {};
  searchText: string;

    // paged items
  listOfPokemonsToDisplay: any[];
  constructor(private pokemonService: PokemonService, private pagerService: PagerService) { }

  ngOnInit() {
    this.getPokemonList();
  }

  getPokemonList() {
    this.pokemonService.getPokemons().subscribe(pokemonInformationResponse => {
      this.loadingMessage = false;
      pokemonInformationResponse.results.forEach(element => {
        this.pokemons.push(new PokemonInformation(element.name,
                                element.url.slice(element.url.lastIndexOf('/pokemon/') + 9, element.url.lastIndexOf('/'))));
      });
      this.filteredPokemons = this.pokemons;
      this.totalCount = this.pokemons.length;
      this.setPage(1);
    },
    error => {
      this.loadingMessage = false;
      this.handleError(error);
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
       console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    this.alerts.push({
      type: 'ERROR',
      message: 'Something bad happened; please try again later.'
    });
  }

  setPage(page: number) {
        if (page < 1) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.filteredPokemons.length, page);
        // get current page of items
        this.listOfPokemonsToDisplay = this.filteredPokemons.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  search() {
    this.filteredPokemons = this.pokemons.filter(pokemons => pokemons.name.indexOf(this.searchText) !== -1);
    this.setPage(1);
  }
}
