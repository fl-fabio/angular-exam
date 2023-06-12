import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Character, CharacterRimap } from 'src/app/models/Character';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {
  @Input() character: CharacterRimap | undefined = undefined;
  router = inject(Router);

  ngOnInit() {

  }

  goDetails(id:number) {
    this.router.navigate(["/home", id]);
  }
}
