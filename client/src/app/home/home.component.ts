import { Component, OnInit } from '@angular/core';
import { StarWars } from '../models/starWars';
import { StarwarsService } from '../services/starwars.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allStarWars: StarWars;
  constructor(private starwarsService: StarwarsService) {}
  ngOnInit() {
    this.starwarsService.getAll().subscribe((data: StarWars) => {
      this.allStarWars = data;
    });
  }
}
