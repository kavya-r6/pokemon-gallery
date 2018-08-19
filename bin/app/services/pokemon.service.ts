import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { PokemonInformationResponse } from '../model/pokemonInformationResponse';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeoutWith';
import 'rxjs/add/observable/throw';

@Injectable()
export class PokemonService {
  pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  constructor(private http: HttpClient) { }

  getPokemons(): Observable<PokemonInformationResponse> {
    const response: Observable<PokemonInformationResponse> = this.http.get<PokemonInformationResponse>(this.pokemonUrl)
      .timeoutWith(60000, Observable.throw(new Error('Time out while fetching data')));
    return response;
  }
}
