import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Modal } from '../models/modal';

@Component({
  selector: 'show-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges {
  @Input() dataModal: Modal;
  @Output() sendEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  modal: Modal;
  constructor() { }

  // esta funcion es para ocultar el modal
  showModal() {
    this.modal.show = false;
  }

  // Esta funcion es para setear la informacion que queremos mostrar que nos envio el componente padre
  ngOnChanges() {
    this.modal = this.dataModal;
  }

  // esta funcion es para enviarle al componente padre la accion que estamos haciendo de eliminar o cancelar
  sendOk() {
    if (this.modal.title === 'eliminar') {
      this.sendEvent.emit(true);
    } else {
      this.sendEvent.emit(false);
    }
    this.showModal();
  }

}
