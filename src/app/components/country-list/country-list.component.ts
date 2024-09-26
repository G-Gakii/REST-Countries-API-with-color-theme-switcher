import { Component, effect, Input, OnInit } from '@angular/core';
import { Countries } from '../../interface/countries';
import { CountriesService } from '../../service/countries.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
})
export class CountryListComponent implements OnInit {
  countries: Countries[] = [];
  mycountries: Countries[] = [];
  continents: string[] = [];
  sContinent: string = '';
  foundCountry: any;
  // filteredcountries: Countries[] = [];
  displayFiltered = false;

  // theme
  mode!: boolean;

  //form

  selectedType: any = {
    country: '',
    continent: '',
  };

  constructor(private service: CountriesService, private router: Router) {
    effect(() => {
      this.mode = this.service.darkMode();
    });
  }
  ngOnInit(): void {
    this.service.getCountries().subscribe({
      next: (response: Countries[]) => {
        this.service.countries.set(response);
        this.countries = this.service.countries();

        this.mycountries = this.countries;

        this.continents = [
          ...new Set(response.map((country) => country.region)),
        ];
      },
    });
  }
  // countries to display
  displayedCountriesByContinent() {
    console.log(this.selectedType.continent);
    let filteredcountries: Countries[] = [];
    if (this.selectedType.continent) {
      filteredcountries = this.countries.filter(
        (country) => country.region === this.selectedType.continent
      );
    } else {
      console.log('else');
      filteredcountries === this.countries;
    }
    this.service.displayedCountries.set(filteredcountries);
    this.mycountries = this.service.displayedCountries();
    console.log(this.service.displayedCountries());
  }

  searchCountryByName() {
    let searchCountry = this.countries.filter((country) =>
      country.name
        .toLowerCase()
        .includes(this.selectedType.country.toLowerCase())
    );
    this.mycountries = searchCountry;
  }

  // navigation to country to get details
  selectedCountryNavigate(code: string) {
    this.foundCountry = this.countries.find(
      (country) => country.numericCode === code
    );
  
  
    this.service.selectedCountry.set(this.foundCountry);

    this.router.navigate(['/country']);
  }
}
