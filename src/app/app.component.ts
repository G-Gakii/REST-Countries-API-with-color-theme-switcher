import { AfterViewInit, Component, effect, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountriesService } from './service/countries.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    CommonModule,
    CountryListComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'RESTCountriesApi';
  mode!: boolean;

  constructor(private service: CountriesService) {
    effect(() => {
      this.mode = this.service.darkMode();
    });
  }
  getValue() {
    this.mode = this.service.darkMode();
  }
}
