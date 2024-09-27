import { Routes } from '@angular/router';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: CountryListComponent,
  },
  {
    path: 'country',
    // component: CountryDetailComponent,
    loadComponent: () =>
      import('./components/country-detail/country-detail.component').then(
        (m) => m.CountryDetailComponent
      ),
  },
  {
    path: 'country/:alpha3Code',
    loadComponent: () =>
      import('./components/country-detail/country-detail.component').then(
        (m) => m.CountryDetailComponent
      ),
  },
];
