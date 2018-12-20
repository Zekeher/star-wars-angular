import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StarWars } from '../models/starWars';
import { StarwarsService } from '../services/starwars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal } from '../models/modal';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  nameSw: String;
  oneSwForm: FormGroup = this.formBuilder.group({
    name: '',
    description: '',
    img: '',
    force: '',
    star: 0
  });
  oneSwShow: any = 'view';
  viewModal: any = [];
  selectForce: Boolean = true;
  saveOn: Boolean = false;
  get oneSw() {
    return this.oneSwForm.value;
  }

  constructor(private starwarsService: StarwarsService,
              private router: Router,
              private routeActive: ActivatedRoute,
              private formBuilder: FormBuilder) {
        this.nameSw = this.routeActive.snapshot.paramMap.get('name');
  }

  default() {
    if (this.nameSw === 'create') {
      this.oneSwShow = 'create';
    } else {
        this.getOneSw();
    }
    this.viewModal.show = false;
  }

  ngOnInit() {
    if (this.nameSw === 'create') {
      this.oneSwShow = 'create';
    } else {
        this.getOneSw();
    }
    this.viewModal.show = false;
  }

  // Esta funcion setea el switch que esta en editar
  setForce(force) {
    if (force === 'Light') {
      this.selectForce = true;
    } else {
      this.selectForce = false;
    }
  }

  // esta funcion obtiene el personaje que queremos ver
  getOneSw() {
    this.starwarsService.getOne(this.nameSw).subscribe((data: StarWars) => {
      this.oneSwForm.setValue({
        name: data.name,
        description: data.description,
        img: data.img,
        force: data.force,
        star: data.star
      });
      this.setForce(data.force);
    });
  }

  // Esta funcion activa la vista normal o editar
  showEdit() {
    this.reset();
    if (this.oneSwShow === 'view') {
      this.oneSwShow = 'edit';
    } else {
      this.oneSwShow = 'view';
    }
  }

  // Esta funcion nos dice que accion estamos realizando en el modal delete o cancelar
  optionOneSW(events) {
    if (events) {
      this.starwarsService.deleteOne(this.nameSw).subscribe(() => {
        this.router.navigateByUrl('/home');
      });
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  // Esta funcion resetea todo cuando cancelamos la edicion del personaje
  reset() {
    if (!this.saveOn) {
      this.getOneSw();
    }
    this.saveOn = false;
  }

  // Esta funcion abre el modal cuando queremos eliminar un personaje
  deleteModal(name) {
    this.viewModal = new Modal();
    this.viewModal.show = true;
    this.viewModal.title = 'eliminar';
    this.viewModal.txt = `Estas seguro en eliminar a ${name}`;
  }

  // Esta funcion es para setear las nuevas Estrellas que nos envio el componente hijo
  starsNew(star) {
    this.oneSw.star = star;
  }

  // Esta funcion actualiza el personaje que estamos editando
  updateOneSw() {
    if (this.selectForce) {
      this.oneSw.force = 'Light';
    } else {
      this.oneSw.force = 'Dark';
    }
    this.starwarsService.setOne(this.oneSw).subscribe(() => {
      this.saveOn = true;
      this.showEdit();
    });
  }

  // esta funcion abre el modal para cancelar la creacion del personaje
  cancelCreate() {
    this.viewModal = new Modal();
    this.viewModal.show = true;
    this.viewModal.title = 'Cancelar';
    this.viewModal.txt = 'Estas seguro en cancelar la creacion del personaje?';
  }

  // Esta funcion es para crear el personaje nuevo
  createOneSw() {
    if (this.selectForce) {
      this.oneSw.force = 'Light';
    } else {
      this.oneSw.force = 'Dark';
    }
    if (!this.oneSw.star) {
      this.oneSw.star = 0;
    }
    this.starwarsService.createOne(this.oneSw).subscribe(() => {
      this.router.navigateByUrl('/home');
    });
  }
}
