import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'alert-menssage',
  templateUrl: './menssage.component.html',
  styleUrls: ['./menssage.component.scss']
})
export class MenssageComponent implements OnChanges {
  @Input() msg: any;

  show: Boolean = false;
  menssage: String = '';

  constructor() { }
  // Esta funcion setea los mensajes de alerta que nos llama el componente padre
  ngOnChanges() {
    this.menssage = this.msg.msg;
    this.show = this.msg.show;
    this.hidden();
  }

  // esta funcion hace ocultar los mensajes de alerta
  hidden() {
    setTimeout( () => {
      this.show = false;
      this.menssage = '';
    }, 3000);
  }

}
