import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@src/environments/environment';
import { map } from 'rxjs';
import { Bike, BikeList } from './bike.model';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  bikeList: Bike[] = [];
  api = `${environment.API_ENDPOINT}/api/bikes`;
  readonly #http = inject(HttpClient);

  loading = true;

  constructor() {}

  getList(
    sortActive: string,
    order: string,
    limit: number,
    page: number,
    query: string
  ) {
    const params = new HttpParams({
      fromObject: {
        '_sort': `${sortActive}`,
        '_order': `${order}`,
        '_limit': limit.toString(),
        '_page': page.toString(),
        q: query
      }
    });

    return this.#http
      .get<BikeList>(this.api, { observe: 'response', params })
      .pipe(
        map((resp) => {
          return {
            data: resp.body,
            total: resp.headers.get('X-Total-Count') ?? 0,
          };
        })
      );
  }

  delete(id: number) {
    return this.#http.delete<Response>(`${this.api}/${String(id)}`);
  }

  getOne(id: number) {
    return this.#http.get<Bike>(`${this.api}/${String(id)}`);
  }

  save(bike: Bike) {
    return !!bike.id ? this.update(bike) : this.create(bike);
  }

  create(bike: Bike) {
    return this.#http.post<Response>(`${this.api}`, bike);
  }

  update(bike: Bike) {
    return this.#http.put<Response>(`${this.api}/${String(bike.id)}`, bike);
  }
}
