import { Component, effect, OnInit } from '@angular/core';
import { Countries } from '../../interface/countries';
import { CountriesService } from '../../service/countries.service';
import { Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
})
export class CountryDetailComponent {
  displayedcountry: any;
  language: string[] = [];
  border: string[] = [];
  mode!: boolean;
  countries: Countries[] = [];
  borderCountry: any;

  constructor(private service: CountriesService, private router: Router) {
    this.displayedcountry = service.selectedCountry();
    this.language = this.displayedcountry.languages.map(
      (item: any) => item.name
    );
    effect(() => {
      this.mode = this.service.darkMode();
    });
  }
  BackToHomePage() {
    this.router.navigate(['']);
  }
  navigateToBorderCountry(code: string) {
    console.log(code);

    this.countries = this.service.countries();
    // find country with a given code
    this.displayedcountry = this.countries.find(
      (country) => country.alpha3Code === code
    );
    console.log('Borderd country =>' + this.displayedcountry?.name);

    if (this.displayedcountry) {
      // navigate to the country
      this.service.selectedCountry.set(this.displayedcountry);
      this.service.selectedCountry();
      this.router.navigate(['/country', this.displayedcountry.alpha3Code]);
    } else {
      console.error('Country not found');
    }
  }
}
