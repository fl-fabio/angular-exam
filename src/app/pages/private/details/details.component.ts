import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id = '';
  name = '';
  description = '';
  thumbnail = {};
  location = inject(Location);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id') || '';
    this.name = this.route.snapshot.queryParamMap.get('name') || '';
    this.description = this.route.snapshot.queryParamMap.get('description') || '';
    this.thumbnail = this.route.snapshot.queryParamMap.get('thumbnail') || '';

    console.log("id",this.id)
    console.log("name",this.name)
    console.log("description",this.description)
    console.log("thumbnail",this.thumbnail)
  }

  goBack(): void {
    this.location.back();
  }
}
