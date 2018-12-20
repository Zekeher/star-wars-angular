import { Component, Input, OnChanges } from '@angular/core';
const url: String = 'http://localhost:3977/api/starwars/img/';

@Component({
  selector: 'app-img-logo',
  templateUrl: './img-logo.component.html',
  styleUrls: ['./img-logo.component.scss']
})
export class ImgLogoComponent implements OnChanges {
  @Input()setImage: String;
  @Input()setClass: String;
  images: String;
  constructor() { }
  // Esta funcion es para mostrar la imagen que estamos solicitando en el componente padre
  ngOnChanges() {
    this.images = this.setImage;
  }

}
