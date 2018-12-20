import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StarWars } from '../models/starWars';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
const url: String = 'http://localhost:3977/api';

@Injectable({
  providedIn: 'root'
})
export class StarwarsService {

constructor(private _http: HttpClient) {}

// Este funcion del servicio es para ver todos los personajes
getAll(): Observable<StarWars> {
  return this._http.get<StarWars>(`${url}/starwars`);
}

// Este funcion del servicio es para ver un personaje
getOne(name): Observable<StarWars> {
  return this._http.get<StarWars>(`${url}/starwars/${name}`);
}

// Ejempplo de RxJS Observable con .pipe()
getTopFive(): Observable<StarWars> {
  return this._http.get<StarWars>(`${url}/starwars`).pipe(
    tap( data => console.log('Unprocessed data:', data) ),
    map( data => {
      const top5 = Array.prototype.slice.call(data).sort( (a, b) => {
        return a.star < b.star ? 1 : -1;
      }).slice(0, 5);
        return top5;
    })
  );
}

// Este funcion del servicio es para actualizar un personaje
setOne(oneSw): Observable<StarWars> {
  return this._http.post<StarWars>(`${url}/starwars/update`, oneSw);
}

// Este funcion del servicio es para Crear un personaje
createOne(oneSw): Observable<StarWars> {
    return this._http.post<StarWars>(`${url}/starwars/create`, oneSw);
}

// Este funcion del servicio es para eliminar un personaje
deleteOne(name): Observable<StarWars> {
    return this._http.delete<StarWars>(`${url}/starwars/${name}`);
  }
}
