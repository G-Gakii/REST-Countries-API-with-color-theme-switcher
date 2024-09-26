import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Countries } from '../interface/countries';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private jsonUrl = 'assets/data.json';
  selectedCountry = signal({});
  darkMode = signal(false);
  countries = signal<Countries[]>([]);
  selectContinent = signal('');
  displayedCountries = signal<Countries[]>([]);

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Countries[]> {
    return this.http.get<Countries[]>(this.jsonUrl);
  }
}
