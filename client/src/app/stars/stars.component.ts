import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'stars-rating',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnChanges {
  @Input()getStar: number;
  @Output()newStar: EventEmitter<Number> = new EventEmitter<Number>();

  stars: any[] = [false, false, false , false, false];
  constructor() { }

  // en esta funcion se setea la cantidad de estrellas que nos envio el componente padre
  ngOnChanges() {
    const star = this.getStar - 1;
    for (let i = 0; i <= 4; i++) {
      if (i <= star) {
        this.stars[i] = true;
      } else {
        this.stars[i] = false;
      }
    }
  }

  // esta funcion le envia al componente padre que estrella se selecciono
  setNewStar(star) {
    star = Number(star);
    this.newStar.emit(star);
  }
}
