import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Character } from '../models/Character';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  apiKey = 'be9389d95d48344820f3ad7df2a0147a';
  clientId = 'ad7c914821d2d2bd57c08fbcc4a55184';
  http = inject(HttpClient);
  constructor() { }

  getAllCharacters = (params:{ limit?:number, offset?:number, nameStartsWith?:string }) => this.http.get<Character[]>(`https://gateway.marvel.com/v1/public/characters?apikey=${this.apiKey}&hash=${this.clientId}&ts=1`, { params });

  getOneCharacter = (id:string) => this.http.get<Character>(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=${this.apiKey}&hash=${this.clientId}&ts=1`)
  .pipe(
    map((response: any) =>
      response.data.results.map((elem: Character) => ({
        id: elem.id,
        name: elem.name,
        description: elem.description,
        thumbnail: elem.thumbnail.path + '.' + elem.thumbnail.extension,
      }))
    ),
  take(1)
  )
}

