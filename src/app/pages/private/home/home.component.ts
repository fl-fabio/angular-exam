import { Component, OnInit, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { delay, take } from 'rxjs';
import { Character } from 'src/app/models/Character';
import { CharactersService } from 'src/app/services/characters.service';
import { data } from 'src/app/mock/data';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  characters:Character[] | undefined = undefined;
  lengthResources:number | undefined = undefined;
  size = 10;
  offset = 0;
  currentPage = 0;
  charactersService = inject(CharactersService);

  ngOnInit(): void {
    this.characters = data
    /* this.fetchCharacters(); */
  }

  fetchCharacters() {
    this.charactersService.getAllCharacters({ limit:this.size, offset:this.offset })
      .pipe(
        delay(500),
        take(1)
      )
      .subscribe({
        next:(res:any) => {
          console.log(res);
          res &&
            (this.characters = res.data.results) &&
            (this.lengthResources = res.data.total)
        },
        error:(error) => {
          console.error(error);
        }
      }
    )
  }

  onPageChange(event:PageEvent) {
    if(this.size === event.pageSize) {
      if(this.currentPage > event.pageIndex) {
        this.offset -= this.size;
        this.currentPage--;
      } else {
        this.offset += this.size;
        this.currentPage++;
      }
    } else {
      this.size = event.pageSize;
      this.currentPage = event.pageIndex
    }
    this.fetchCharacters();
  }
}
